import Response from "../../../types/Response";
import SongData from "../../../types/Song";
import api from "../../index";


const createSong = (song: FormData) => api.post<Response<SongData>>('/songs', song);
const getSongById = (id: string) => api.get<Response<SongData>>(`/songs/${id}`);

const songService = {
    createSong,
    getSongById,
}

export default songService;