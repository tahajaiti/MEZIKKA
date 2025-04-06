import api from "../..";
import Genre from "../../../types/Genre";
import Response from "../../../types/Response";





const getAll = () => api.get<Response<Genre[]>>('/genres');


const genreService = {
    getAll
}

export default genreService;