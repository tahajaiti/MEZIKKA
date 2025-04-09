import Response from "../../../types/Response";
import SongData from "../../../types/Song";
import api, { file } from "../../index";


const createSong = (song: FormData) => api.post<Response<SongData>>('/songs', song);
const getSongById = (id: string | number) => api.get<Response<SongData>>(`/songs/${id}`);
const getSongFile = (path: string | number): Promise<ArrayBuffer> => file.get<ArrayBuffer>(`/files/${path}`);

const songService = {
    createSong,
    getSongById,
    getSongFile
}

export default songService;