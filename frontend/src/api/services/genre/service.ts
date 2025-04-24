import api from "../..";
import Genre from "../../../types/Genre";
import Response from "../../../types/Response";





const getAll = () => api.get<Response<Genre[]>>('/genres');
const getImg = (genre: string) => api.get<Response<string>>(`/genres/image/${genre}`);

const genreService = {
    getAll,
    getImg
}

export default genreService;