import api from "../..";
import Response from "../../../types/Response";
import User from "../../../types/User";


const getUserById = (id: string | number) => api.get<Response<User>>(`/users/${id}`);

const userService = {
    getUserById
}

export default userService;