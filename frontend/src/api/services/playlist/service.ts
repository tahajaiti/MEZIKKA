import api from "../..";
import { PlaylistData } from "../../../types/Playlist";
import Response, { PaginateResponse } from "../../../types/Response";
import SongData from "../../../types/Song";



const createPlaylist = (data: FormData) => api.post<Response<PlaylistData>>('/playlists', data);
const deletePlaylist = (id: string) => api.delete<Response<PlaylistData>>(`/playlists/${id}`);

const getPlaylists = () => api.get<Response<PlaylistData[]>>('/playlists');
const getPlaylist = (id: string, pageParam: number = 1) => api.get<Response<PlaylistData>>(`/playlists/${id}?page=${pageParam}`);
const getPlaylistSongs = (id: string, pageParam: number = 1) => api.get<PaginateResponse<SongData[]>>(`/playlists/${id}/songs?page=${pageParam}`);

const getUserPlaylist = (id: string, pageParam: number = 1) => api.get<PaginateResponse<PlaylistData[]>>(`/playlists/user/${id}?page=${pageParam}`);

const addSongToPlaylist = (playlistId: string, songId: string) => api.post<Response<PlaylistData>>(`/playlists/${playlistId}/songs/${songId}`);


const playlistService = {
    createPlaylist,
    deletePlaylist,
    getPlaylists,
    getPlaylist,
    getUserPlaylist,
    getPlaylistSongs,
    addSongToPlaylist
};

export default playlistService;