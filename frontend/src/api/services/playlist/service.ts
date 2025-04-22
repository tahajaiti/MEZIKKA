import api from "../..";
import { PlaylistData } from "../../../types/Playlist";
import Response, { PaginateResponse } from "../../../types/Response";


const createPlaylist = (data: FormData) => api.post<Response<PlaylistData>>('/playlists', data);
const deletePlaylist = (id: string) => api.delete<Response<PlaylistData>>(`/playlists/${id}`);
const getPlaylists = () => api.get<Response<PlaylistData[]>>('/playlists');
const getPlaylist = (id: string) => api.get<Response<PlaylistData>>(`/playlists/${id}`);
const getUserPlaylist = (id: string, pageParam: number = 1) => api.get<PaginateResponse<PlaylistData[]>>(`/playlists/user/${id}?page=${pageParam}`);

const playlistService = {
    createPlaylist,
    deletePlaylist,
    getPlaylists,
    getPlaylist,
    getUserPlaylist,
};

export default playlistService;