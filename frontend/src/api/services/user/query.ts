import { useQuery, UseQueryResult } from "@tanstack/react-query";
import userService from "./service";
import User from "../../../types/User";



export const useGetUser = (id: string | number): UseQueryResult<User, Error> => {
    return useQuery({
        queryKey: ['song', id],
        queryFn: () => userService.getUserById(id), 
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
};