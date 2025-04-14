import { useQuery, UseQueryResult } from "@tanstack/react-query";
import followService from "./service";
import { Follow } from "../../../types/Follow";
import Response from "../../../types/Response";


export const useGetFollows = (): UseQueryResult<Response<Follow>, Error> => {
    return useQuery({
        queryKey: ['followers'],
        queryFn: () => followService.getFollows(),
        staleTime: 5 * 60 * 1000,
        retry: 1,
    })
}