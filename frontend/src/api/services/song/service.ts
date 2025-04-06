import Response from "../../../types/Response";
import api from "../../index";


const createSong = (song: FormData) => api.post<Response<unknown>>('/songs', song);

const songService = {
    createSong,
}

export default songService;