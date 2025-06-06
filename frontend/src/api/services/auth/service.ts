import api from "../../index";
import AuthData, { creds } from "../../../types/Auth";
import Response from "../../../types/Response";


const login = (creds: Pick<creds, 'email' | 'password'>) => api.post<Response<AuthData>>('/auth/login', creds);
const register = (creds: creds) => api.post<Response<AuthData>>('/auth/register', creds);
const logout = () => api.post<Response<null>>('/auth/logout');
const refreshToken = () => api.post<Response<AuthData>>('/auth/refresh');

const authService = {
    login,
    register,
    logout,
    refreshToken
};
export default authService;