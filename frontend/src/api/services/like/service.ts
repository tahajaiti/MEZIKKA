import { LikeData, Likes } from "../../../types/Likes";
import Response from "../../../types/Response";
import api from "../../index";


const getLikes = () => api.get<Response<Likes>>('/likes');
const toggleLike = (type: string, id: string | number) => api.post<Response<Likes>>(`/likes/${type}/${id}`);
const getLike = (type: string, id: string | number) => api.get<Response<LikeData>>(`/likes/${type}/${id}`);
const getLikeCount = (type: string, id: string | number) => api.get<Response<Likes>>(`/likes/${type}/${id}/count`);

const likeService = {
    getLikes,
    toggleLike,
    getLike,
    getLikeCount
};

export default likeService;