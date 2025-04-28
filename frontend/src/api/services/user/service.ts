import api from "../..";
import Profile from "../../../types/Profile";
import Response, { PaginateResponse } from "../../../types/Response";
import User, { UserResponse } from "../../../types/User";


const getUserById = (id: string | number) => api.get<Response<UserResponse>>(`/users/${id}`);
const updateProfile = (data: FormData) => api.post<Response<Profile>>(`/profile?_method=put`, data);

const getPaginated = (page: number) => api.get<PaginateResponse<User[]>>(`/users?page=${page}`);

const userService = {
    getUserById,
    getPaginated,
    updateProfile,
}

export default userService;