import Response, { PaginateResponse } from "../../../types/Response";
import SongData from "../../../types/Song";
import api, { file } from "../../index";


const createSong = (song: FormData) => api.post<Response<SongData>>('/songs', song);
const getSongById = (id: string | number) => api.get<Response<SongData>>(`/songs/${id}`);
const getSongFile = (path: string | number): Promise<Blob> => file.get<Blob>(`/files/${path}`);
const getAll = () => api.get<Response<SongData[]>>('/songs');
const getPaginated = (page: number) => api.get<PaginateResponse<SongData[]>>(`/song/paginated?page=${page}`);

const getUserSongs = (id: string | number, pageParam: number = 1) =>
    api.get<PaginateResponse<SongData[]>>(`/songs/user/${id}?page=${pageParam}`);
const getSongsByGenre = (genre: string, pageParam: number = 1) => api.get<PaginateResponse<SongData[]>>(`/songs/genre/${genre}?page=${pageParam}`);
const getMostLikedSongs = () => api.get<Response<SongData[]>>('/songs/liked/most');

const deleteSong = (id: number ) => api.delete<Response<boolean>>(`/songs/${id}`);


const songService = {
    createSong,
    getSongById,
    getSongFile,
    getAll,
    getPaginated,
    deleteSong,
    getUserSongs,
    getSongsByGenre,
    getMostLikedSongs,
}

export default songService;