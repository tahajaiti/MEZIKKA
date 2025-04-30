import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Response from "../../../types/Response";
import songService from "./service";
import SongData from "../../../types/Song";



export const useCreateSong = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (song: FormData) => songService.createSong(song),
        onSuccess: (res: Response<SongData>) => {
            queryClient.invalidateQueries({ queryKey: ['songs'] });
            queryClient.invalidateQueries({ queryKey: ['song', res.data?.id] });
        },
        onError: (error: Error) => {
            console.error("Error creating song:", error);
        },
    });
};

export const useGetSong = (id: string | number) => {
    return useQuery({
        queryKey: ['song', id],
        queryFn: () => songService.getSongById(id),
        staleTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: !!id,
    });
};

export const useGetFile = (id: string | number) => {
    return useQuery({
        queryKey: ['file', id],
        queryFn: () => songService.getSongFile(id),
        staleTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: !!id,
    });
};

export const useGetMostLikedSongs = () => {
    return useQuery({
        queryKey: ['songs', 'most-liked'],
        queryFn: () => songService.getMostLikedSongs(),
        staleTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
    });
};

export const useGetAllSongs = () => {
    return useQuery({
        queryKey: ['songs'],
        queryFn: () => songService.getAll(),
        staleTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
    });
};

export const useInfiniteUserSongs = (id: string | number) => {
    return useInfiniteQuery({
        queryKey: ['user-songs', id],
        queryFn: ({ pageParam = 1 }) => songService.getUserSongs(id, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const { current_page, last_page: totalPages } = lastPage.data;
            return current_page < totalPages ? current_page + 1 : undefined;
        },
        retry: 1,
        enabled: !!id,
    });
};

export const useInfiniteGenreSongs = (genre: string) => {
    return useInfiniteQuery({
        queryKey: ['songs', 'genre', genre],
        queryFn: ({ pageParam = 1 }) => songService.getSongsByGenre(genre, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const { current_page, last_page: totalPages } = lastPage.data;
            return current_page < totalPages ? current_page + 1 : undefined;
        },
        retry: 1,
        enabled: !!genre,
    });
};

export const useGetPaginatedSongs = (page: number) => {
    return useQuery({
        queryKey: ['songs', 'paginated', page],
        queryFn: () => songService.getPaginated(page),
        staleTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: !!page,
    });
};

export const useDeleteSong = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id }: { id: number }) => songService.deleteSong(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['songs'] });
            queryClient.invalidateQueries({ queryKey: ['user-songs'] });
        },
        onError: (error: Error) => {
            console.error("Error deleting song:", error);
        },
    });
};