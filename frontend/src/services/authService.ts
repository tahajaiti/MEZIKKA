import api from "../api";
import AuthData from "../types/Auth";
import Response from "../types/Response";

interface creds {
    name: string;
    email: string;
    password: string;
}

const login = (creds: Pick<creds, 'email' | 'password'>) => api.post<Response<AuthData>>('/auth/login', creds);
const register = (creds: creds) => api.post<Response<AuthData>>('/auth/register', creds);
const logout = () => api.post<Response<null>>('/auth/logout');


const authService = {
    login,
    register,
    logout
};
export default authService;