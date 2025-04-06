import Response from "../../../types/Response";
import SongData from "../../../types/Song";
import api from "../../index";


const createSong = (song: FormData) => api.post<Response<SongData>>('/songs', song);

const songService = {
    createSong,
}

export default songService;