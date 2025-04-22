import api from "../..";
import Response from "../../../types/Response";
import SongData from "../../../types/Song";
import User from "../../../types/User";



const search = (query: string) => api.get<Response<SongData[]>>(`/search?q=${query}`);
const userSearch = (query: string) => api.get<Response<User[]>>(`/search/user?q=${query}`);

const searchService = {
    search,
    userSearch
};

export default searchService;