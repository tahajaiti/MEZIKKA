import { Likes, LikesGet } from "../../../types/Likes";
import Response from "../../../types/Response";
import api from "../../index";

interface CountData {
    total_likes: number;
}

const getLikes = () => api.get<Response<LikesGet>>('/likes');
const toggleLike = (type: string, id: string | number) => api.post<Response<Likes>>(`/likes/${type}/${id}`);
const getLikeCount = (type: string, id: string | number) => api.get<Response<CountData>>(`/likes/${type}/${id}/count`);

const likeService = {
    getLikes,
    toggleLike,
    getLikeCount
};

export default likeService;