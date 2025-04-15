import api from "../..";
import { Follow } from "../../../types/Follow";
import Response from "../../../types/Response";

const getFollows = (id: string | number) => api.get<Response<Follow>>(`/follow/${id}`);
const follow = (id: string | number) => api.post<Response<null>>(`/follow/${id}`);
const unfollow = (id: string | number) => api.delete<Response<null>>(`/follow/${id}`);


const followService = {
    getFollows,
    follow,
    unfollow
}

export default followService;