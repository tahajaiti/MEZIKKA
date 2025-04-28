import { useMutation, useQuery } from "@tanstack/react-query";
import genreService from "./service";



export const useGetGenres = () => {
    return useQuery({
        queryKey: [`genres-${new Date()}`],
        queryFn: genreService.getAll,
        staleTime: 5 * 60 * 1000,
        retry: 1
    })
}

export const useGetPaginatedGenres = (page: number) => {
    return useQuery({
        queryKey: [`genres-${page}`],
        queryFn: () => genreService.getPaginated(page),
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

export const useCreateGenre = () => {
    return useMutation({
        mutationFn: genreService.createGenre,
        onError: (error) => {
            console.error("Error creating genre:", error);
        },
        onSuccess: () => {
            console.log("Genre created successfully");
        }
    })
}