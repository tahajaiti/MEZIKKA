import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import genreService from "./service";



export const useGetGenres = () => {
    return useQuery({
        queryKey: ['genres'],
        queryFn: genreService.getAll,
        staleTime: 5 * 60 * 1000,
        retry: 1
    })
}

export const useGetPaginatedGenres = (page: number) => {
    return useQuery({
        queryKey: ['genres'],
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
    const QueryClient = useQueryClient();

    return useMutation({
        mutationFn: genreService.createGenre,
        onError: (error) => {
            console.error("Error creating genre:", error);
        },
        onSuccess: () => {
            console.log("Genre created successfully");
            QueryClient.invalidateQueries({ queryKey: ['genres'] });
        }
    })
}

export const useDeleteGenre = () => {
    const QueryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { id: number }) => genreService.deleteGenre(data.id),
        onSuccess: () => {
            QueryClient.invalidateQueries({ queryKey: ['genres'] });
        }
    })

}