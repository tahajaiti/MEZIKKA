import { useQuery, UseQueryResult } from "@tanstack/react-query";
import Response from "../../../types/Response";
import Genre from "../../../types/Genre";
import genreService from "./service";



export const useGetGenres = (): UseQueryResult<
    Response<Genre[]>,
    Error
> => {

    return useQuery({
        queryKey: [`genres-${new Date()}`],
        queryFn: genreService.getAll,
        staleTime: 5 * 60 * 1000,
        retry: 1
    })
}

export const useGetGenreImg = (genre: string) => {
    return useQuery({
        queryKey: [`genre-img-`, genre],
        queryFn: () => genreService.getImg(genre),
        staleTime: 10 * 60 * 1000,
        retry: 1
    })
}