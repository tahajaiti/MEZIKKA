import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import useAuthStore, { logout } from '../stores/authStore';
import authService from './services/auth/service';

interface LaravelValidationError {
    message: string;
    errors: Record<string, string[]>;
}

interface LaravelApiError {
    message: string;
    errors?: Record<string, string[]>;
    exception?: string;
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api';
const REQUEST_TIMEOUT = 10000;

const apiClient = axios.create({
    baseURL: API_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

const fileClient = axios.create({
    baseURL: API_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
    responseType: 'blob'
});

const addAuthInterceptor = (clients: AxiosInstance[]) => {
    clients.forEach(client => {
        client.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                if (config.data instanceof FormData) {
                    config.headers['Content-Type'] = 'multipart/form-data';
                }

                return config;
            },
            (error: AxiosError) => Promise.reject(error)
        );
    });
};

addAuthInterceptor([apiClient, fileClient]);

let isRefreshing = false;
let pendingRequests: Array<() => void> = [];

const processQueue = (error: Error | null = null) => {
    pendingRequests.forEach(callback => {
        if (error) {
            return;
        }
        callback();
    });

    pendingRequests = [];
};

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    async (error: AxiosError<LaravelApiError>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (!error.response) {
            return Promise.reject({
                message: 'Network error - The server is currently unavailable. Please try again later.',
                status: 'network_error'
            });
        }

        const { status, data } = error.response;

        if (status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise(resolve => {
                    pendingRequests.push(() => {
                        resolve(apiClient(originalRequest));
                    });
                });
            }

            isRefreshing = true;

            try {
                const refreshResponse = await authService.refreshToken();
                if (!refreshResponse?.data) {
                    throw new Error('No data returned from refresh token request');
                }

                const { token, user } = refreshResponse.data;
                useAuthStore.getState().setAuth(token, user);

                processQueue();

                return apiClient(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                logout();
                processQueue(refreshError as Error);

                return Promise.reject({
                    message: 'Your session has expired. Please log in again.',
                    status: 'session_expired',
                });
            } finally {
                isRefreshing = false;
            }
        }

        if (status === 401 && originalRequest._retry) {
            logout();
            return Promise.reject({
                message: 'Authentication failed. Please log in again.',
                status: 'unauthorized'
            });
        }

        switch (status) {
            case 422: {
                const validationErr = data as LaravelValidationError;
                return Promise.reject({
                    message: validationErr.message || 'Validation failed',
                    errors: validationErr.errors,
                    status: 'validation_error'
                });
            }
            case 403:
                return Promise.reject({
                    message: data?.message || 'You do not have permission to perform this action',
                    status: 'forbidden'
                });
            case 404:
                return Promise.reject({
                    message: data?.message || 'Resource not found',
                    status: 'not_found'
                });
            case 500:
                return Promise.reject({
                    message: 'Server error occurred. Please try again later.',
                    status: 'server_error',
                    error: data
                });
            default:
                return Promise.reject({
                    message: data?.message || 'An unexpected error occurred',
                    status: 'unknown_error',
                    error: data
                });
        }
    }
);

fileClient.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error: AxiosError) => {
        if (!error.response) {
            return Promise.reject({
                message: 'Network error - The server is currently unavailable. Please try again later.',
                status: 'network_error',
            });
        }

        const { status, data } = error.response;

        switch (status) {
            case 401:
                logout();
                return Promise.reject({
                    message: 'Authentication failed. Please log in again.',
                    status: 'unauthorized',
                });
            case 403:
                return Promise.reject({
                    message: 'You do not have permission to access this file',
                    status: 'forbidden',
                });
            case 404:
                return Promise.reject({
                    message: 'File not found',
                    status: 'not_found',
                });
            default:
                return Promise.reject({
                    message: 'An unexpected error occurred while retrieving the file',
                    status: 'unknown_error',
                    error: data,
                });
        }
    }
);

const api = {
    get: <T>(url: string, config = {}): Promise<T> =>
        apiClient.get<T>(url, config) as unknown as Promise<T>,

    post: <T>(url: string, data = {}, config = {}): Promise<T> =>
        apiClient.post<T>(url, data, config) as unknown as Promise<T>,

    put: <T>(url: string, data = {}, config = {}): Promise<T> =>
        apiClient.put<T>(url, data, config) as unknown as Promise<T>,

    patch: <T>(url: string, data = {}, config = {}): Promise<T> =>
        apiClient.patch<T>(url, data, config) as unknown as Promise<T>,

    delete: <T>(url: string, config = {}): Promise<T> =>
        apiClient.delete<T>(url, config) as unknown as Promise<T>
};

export const file = {
    get: <T>(url: string, config = {}): Promise<T> =>
        fileClient.get<T>(url, config) as unknown as Promise<T>,
};

export default api;