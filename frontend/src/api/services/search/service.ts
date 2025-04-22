import api from "../..";
import Response from "../../../types/Response";
import SongData from "../../../types/Song";
import User from "../../../types/User";



const search = (query: string, sort: string = "newest") => 
    api.get<Response<SongData[]>>(`/search?q=${query}&sort=${sort}`);
const userSearch = (query: string, sort: string = "newest") => 
    api.get<Response<User[]>>(`/search/user?q=${query}&sort=${sort}`);

const searchService = {
    search,
    userSearch
};

export default searchService;