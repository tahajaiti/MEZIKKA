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


const addInterceptor = (client: AxiosInstance[]) => {
    client.forEach(c => {
        c.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                if (config.data instanceof FormData) {
                    delete config.headers['Content-Type'];
                    config.headers['Content-Type'] = 'multipart/form-data';
                }

                return config;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );
    })
}


const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api';

const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});


const fileClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    withCredentials: true,
    responseType: 'blob'
});

addInterceptor([apiClient, fileClient]);

let isRefreshing = false;

let pendingRequests: Array<() => void> = [];

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    async (error: AxiosError<LaravelApiError>) => {
        const originalRequest = error.config;

        if (!error.response) {
            return Promise.reject({
                message: 'Network error - The server is currently down please try again later',
                status: 'network_error'
            });
        }

        const { status, data } = error.response;


        if (status === 401 && originalRequest) {

            if (isRefreshing) {
                return new Promise((resolve) => {
                    pendingRequests.push(() => {
                        resolve(apiClient(originalRequest));
                    });
                });
            }

            isRefreshing = true;

            try {

                const refreshResponse = await authService.refreshToken();
                if (!refreshResponse.data) {
                    throw new Error('No data returned');
                }

                const data = refreshResponse.data;

                useAuthStore.getState().setAuth(data.token, data.user);
                
                pendingRequests.forEach(callback => callback());
                pendingRequests = [];

                console.log('Token refreshed successfully');

                return apiClient(originalRequest);
            } catch (e) {
                console.error('Refresh token error:', e);
                useAuthStore.getState().clearAuth();
                pendingRequests.forEach(() => {});
                pendingRequests = [];

                return Promise.reject({
                    message: 'Session_expired - Please log in again',
                    status: 'session_expired',
                })
            } finally {
                isRefreshing = false;
            }

        }




        switch (status) {
            case 422: {
                const validationErr = error.response.data as LaravelValidationError;
                return Promise.reject({
                    message: validationErr.message || 'Validation failed',
                    errors: validationErr.errors,
                    status: 'validation_error'
                });
            }

            case 401: {
                const unauthorizedErr = error.response.data as LaravelApiError;
                logout();
                return Promise.reject({
                    message: unauthorizedErr.message || 'Unauthorized',
                    status: 'unauthorized'
                });
            }

            default:
                return Promise.reject({
                    message: data?.message || 'An unexpected error occurred',
                    status: 'unknown_error',
                    error: data
                });
        }
    }
)

fileClient.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error: AxiosError) => {
        if (!error.response) {
            return Promise.reject({
                message: 'Network error - The server is currently down please try again later',
                status: 'network_error',
            });
        }

        const { status, data } = error.response;
        switch (status) {
            case 401: {
                logout();
                return Promise.reject({
                    message: 'Unauthorized - Please log in again',
                    status: 'unauthorized',
                });
            }
            case 404: {
                return Promise.reject({
                    message: 'File not found',
                    status: 'not_found',
                });
            }
            default:
                return Promise.reject({
                    message: 'An unexpected error occurred while fetching the file',
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
}

export default api;