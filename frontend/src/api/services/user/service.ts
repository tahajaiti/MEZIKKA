import api from "../..";
import Profile from "../../../types/Profile";
import Response from "../../../types/Response";
import User from "../../../types/User";


const getUserById = (id: string | number) => api.get<Response<User>>(`/users/${id}`);
const updateProfile = (data: FormData) => api.post<Response<Profile>>(`/profile?_method=put`, data);


const userService = {
    getUserById,
    updateProfile
}

export default userService;