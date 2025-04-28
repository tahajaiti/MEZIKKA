import api from "../..";
import Genre from "../../../types/Genre";
import Response from "../../../types/Response";
import SongData from "../../../types/Song";



interface Stats {
    total: number;
    growth: number;
}

export interface TopGenres extends Genre {
    songs_count: number;
}

export interface TopSongs extends SongData {
    likes_count: number;
}


const getUserStats = (period: number) => api.get<Response<Stats>>(`/stats/user/${period}`);
const getSongStats = (period: number) => api.get<Response<Stats>>(`/stats/song/${period}`);
const getPlaylistStats = (period: number) => api.get<Response<Stats>>(`/stats/playlist/${period}`);
const getLikeStats = (period: number) => api.get<Response<Stats>>(`/stats/like/${period}`);

const getTopGenres = () => api.get<Response<TopGenres[]>>('/stats/top/genres');
const getTopSongs = () => api.get<Response<TopSongs[]>>('/stats/top/songs');

const statsService = {
    getUserStats,
    getSongStats,
    getPlaylistStats,
    getLikeStats,
    getTopGenres,
    getTopSongs,
}

export default statsService;