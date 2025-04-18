import Response from "../../../types/Response";
import SongData from "../../../types/Song";
import api, { file } from "../../index";


const createSong = (song: FormData) => api.post<Response<SongData>>('/songs', song);
const getSongById = (id: string | number) => api.get<Response<SongData>>(`/songs/${id}`);
const getSongFile = (path: string | number): Promise<Blob> => file.get<Blob>(`/files/${path}`);
const getAll = () => api.get<Response<SongData[]>>('/songs');

const songService = {
    createSong,
    getSongById,
    getSongFile,
    getAll
}

export default songService;