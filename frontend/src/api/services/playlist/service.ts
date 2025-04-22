import api from "../..";



const getPlaylists = () => api.get('/playlists');


const playlistService = {
    getPlaylists,
};

export default playlistService;