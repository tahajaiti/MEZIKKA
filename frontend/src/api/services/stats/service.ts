import api from "../..";
import Response from "../../../types/Response";



interface Stats {
    total: number;
    growth: number;
}




const getUserStats = (period: number) => api.get<Response<Stats>>(`/stats/user/${period}`);
const getSongStats = (period: number) => api.get<Response<Stats>>(`/stats/song/${period}`);
const getPlaylistStats = (period: number) => api.get<Response<Stats>>(`/stats/playlist/${period}`);

const statsService = {
    getUserStats,
    getSongStats,
    getPlaylistStats,
}

export default statsService;