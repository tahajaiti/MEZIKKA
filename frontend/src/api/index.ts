import axios, {AxiosError, InternalAxiosRequestConfig, AxiosResponse} from 'axios';

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