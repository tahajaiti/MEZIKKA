import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

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

const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});


apiClient.interceptors.request.use(
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

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError<LaravelApiError>) => {

        if (!error.response) {
            return Promise.reject({
                message: 'Network error - The server is currently down please try again later',
                status: 'network_error'
            });
        }

        const { status, data } = error.response;

        console.log(data);

        switch (status) {
            case 422: {
                const validationErr = error.response.data as LaravelValidationError;
                return Promise.reject({
                    message: validationErr.message || 'Validation failed',
                    errors: validationErr.errors,
                    status: 'validation_error'
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

const api = {
    get: <T>(url: string, config = {}) =>
        apiClient.get<T>(url, config),

    post: <T>(url: string, data = {}, config = {}) =>
        apiClient.post<T>(url, data, config),

    put: <T>(url: string, data = {}, config = {}) =>
        apiClient.put<T>(url, data, config),

    patch: <T>(url: string, data = {}, config = {}) =>
        apiClient.patch<T>(url, data, config),

    delete: <T>(url: string, config = {}) =>
        apiClient.delete<T>(url, config)
};

export default api;