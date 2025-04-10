import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
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