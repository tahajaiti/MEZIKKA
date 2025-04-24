import { useInfiniteQuery, useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import Response from "../../../types/Response";
import songService from "./service";
import SongData from "../../../types/Song";



export const useCreateSong = (): UseMutationResult<
    Response<SongData>,
    Error,
    FormData
> => {
    return useMutation({
        mutationFn: (song: FormData) => songService.createSong(song),
        onSuccess: (res) => {
            console.log("Song created successfully", res);
        },
        onError: (error) => {
            console.error("Error creating song", error);
        },
    });
}

export const useGetSong = (id: string | number): UseQueryResult<Response<SongData>, Error> => {
    return useQuery({
        queryKey: ['song', id],
        queryFn: () => songService.getSongById(id),
        staleTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: true,
    });
};

export const useGetFile = (id: string | number): UseQueryResult<ArrayBuffer, Error> => {
    return useQuery({
        queryKey: ['file', id],
        queryFn: () => songService.getSongFile(id),
        staleTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: true,
    });
}

export const useGetMostLikedSongs = () => {
    return useQuery({
        queryKey: ['songs', 'most-liked'],
        queryFn: () => songService.getMostLikedSongs(),
        staleTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: true,
    });
}

export const useGetAllSongs = (): UseQueryResult<Response<SongData[]>, Error> => {
    return useQuery({
        queryKey: ['songs'],
        queryFn: () => songService.getAll(),
        staleTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: true,
    });
}

export const useInfinitUserSongs = (id: string | number) => {
    return useInfiniteQuery({
        queryKey: ['likes'],
        queryFn: ({ pageParam = 1 }) => songService.getUserSongs(id, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const { current_page, last_page: totalPages } = lastPage.data;
            return current_page < totalPages ? current_page + 1 : undefined;
        },
        retry: 1,
    });
}

export const useInfiniteGenreSongs = (genre: string) => {
    return useInfiniteQuery({
        queryKey: ['song','genre', genre],
        queryFn: ({ pageParam = 1 }) => songService.getSongsByGenre(genre, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const { current_page, last_page: totalPages } = lastPage.data;
            return current_page < totalPages ? current_page + 1 : undefined;
        },
        retry: 1,
    });
}