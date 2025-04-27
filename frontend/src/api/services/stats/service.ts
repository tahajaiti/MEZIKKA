import api from "../..";
import Response from "../../../types/Response";

interface Stats {
    total_users: number;
    total_songs: number;
    total_playlists: number;
    total_genres: number;
}



const getStats = api.get<Response<Stats>>(`/statistics`);


const statsService = {
    getStats,
}

export default statsService;