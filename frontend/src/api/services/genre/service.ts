import api from "../..";
import Genre from "../../../types/Genre";
import Response, { PaginateResponse } from "../../../types/Response";





const getAll = () => api.get<Response<Genre[]>>('/genres');
const getPaginated = (page: number) => api.get<PaginateResponse<Genre[]>>(`/genres?page=${page}`);
const getImg = (genre: string) => api.get<Response<string>>(`/genres/image/${genre}`);

const createGenre = (name: string) => api.post<Response<Genre>>('/genres', { name });
const deleteGenre = (id: number) => api.delete(`/genres/${id}`);
const editGenre = (id: number, name: string) => api.put(`/genres/${id}`, { name });

const genreService = {
    getAll,
    getPaginated,
    createGenre,
    deleteGenre,
    editGenre,
    getImg
}

export default genreService;