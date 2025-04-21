import { LikesGet } from "../../../types/Likes";
import Response, { PaginateResponse } from "../../../types/Response";
import SongData from "../../../types/Song";
import api from "../../index";

interface CountData {
    total_likes: number;
}

const getLikes = () => api.get<Response<LikesGet>>('/likes');
const getLikedSongs = (pageParam: number = 1) => api.get<PaginateResponse<SongData[]>>(`/likes/songs?page=${pageParam}`);
const toggleLike = (type: string, id: string | number) => api.post<Response<null>>(`/likes/${type}/${id}`);
const getLikeCount = (type: string, id: string | number) => api.get<Response<CountData>>(`/likes/${type}/${id}/count`);

const likeService = {
    getLikes,
    getLikedSongs,
    toggleLike,
    getLikeCount
};

export default likeService;