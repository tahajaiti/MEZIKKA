import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import playlistService from "./service";


export const useCreatePlaylist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: FormData) => playlistService.createPlaylist(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['playlists'] });
        },
    });
};

export const useDeletePlaylist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => playlistService.deletePlaylist(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['playlists'] });
        },
    });
}

export const useGetPlaylists = () => {
    return useQuery({
        queryKey: ['playlists'],
        queryFn: playlistService.getPlaylists,
        staleTime: 1000 * 60 * 5,
    });
};


export const useGetPlaylist = (id: string) => {
    return useQuery({
        queryKey: ['playlists', id],
        queryFn: () => playlistService.getPlaylist(id),
        staleTime: 1000 * 60 * 5,
    });
}