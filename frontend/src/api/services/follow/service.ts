import api from "../..";
import { Follow } from "../../../types/Follow";
import Response from "../../../types/Response";

const getFollows = () => api.get<Response<Follow>>('/follows');

const followService = {
    getFollows,
}

export default followService;