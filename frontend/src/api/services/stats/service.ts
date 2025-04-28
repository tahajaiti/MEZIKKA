import api from "../..";
import Response from "../../../types/Response";



interface Stats {
    total: number;
    growth: number;
}




const getUserStats = (period: number) => api.get<Response<Stats>>(`/stats/user/${period}`);
const getSongStats = (period: number) => api.get<Response<Stats>>(`/stats/song/${period}`);
const getPlaylistStats = (period: number) => api.get<Response<Stats>>(`/stats/playlist/${period}`);
const getLikeStats = (period: number) => api.get<Response<Stats>>(`/stats/like/${period}`);

const statsService = {
    getUserStats,
    getSongStats,
    getPlaylistStats,
    getLikeStats,
}

export default statsService;