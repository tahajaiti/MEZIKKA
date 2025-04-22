import api from "../..";
import { PlaylistData } from "../../../types/Playlist";
import Response from "../../../types/Response";


const createPlaylist = (data: FormData) => api.post<Response<PlaylistData>>('/playlists', data);
const deletePlaylist = (id: string) => api.delete<Response<PlaylistData>>(`/playlists/${id}`);
const getPlaylists = () => api.get<Response<PlaylistData[]>>('/playlists');


const playlistService = {
    createPlaylist,
    deletePlaylist,
    getPlaylists,
};

export default playlistService;