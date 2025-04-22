import api from "../..";
import Response from "../../../types/Response";
import SongData from "../../../types/Song";



const search = (query: string) => api.get<Response<SongData[]>>(`/search?q=${query}`);


const searchService = {
    search
};

export default searchService;