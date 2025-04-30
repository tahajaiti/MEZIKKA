import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import playlistService from "./service";

export const useCreatePlaylist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: FormData) => playlistService.createPlaylist(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['playlists'] });
            queryClient.invalidateQueries({ queryKey: ['playlists', 'user'] });
        },
    });
};

export const useDeletePlaylist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => playlistService.deletePlaylist(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ['playlists'] });
            queryClient.invalidateQueries({ queryKey: ['playlists', id] });
            queryClient.invalidateQueries({ queryKey: ['playlists', 'user'] });
        },
    });
};

export const useUpdatePlaylist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { id: string, formData: FormData }) => 
            playlistService.updatePlaylist(data.id, data.formData),
        onSuccess: (_, data) => {
            queryClient.invalidateQueries({ queryKey: ['playlists', data.id] });
            queryClient.invalidateQueries({ queryKey: ['playlists'] });
            queryClient.invalidateQueries({ queryKey: ['playlists', 'user'] });
        },
    });
};

export const useGetPlaylists = () => {
    return useQuery({
        queryKey: ['playlists'],
        queryFn: playlistService.getPlaylists,
        staleTime: 5 * 60 * 1000,
    });
};

export const useGetPlaylist = (id: string) => {
    return useQuery({
        queryKey: ['playlists', id],
        queryFn: () => playlistService.getPlaylist(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000, 
    });
};

export const useInfinitePlaylistSongs = (id: string) => {
    return useInfiniteQuery({
        queryKey: ['playlists', 'songs', id],
        queryFn: ({ pageParam = 1 }) => playlistService.getPlaylistSongs(id, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (!lastPage?.data) return undefined;

            const { current_page, last_page: totalPages } = lastPage.data;
            return current_page < totalPages ? current_page + 1 : undefined;
        },
        retry: 1,
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
};

export const useInfiniteUserPlaylist = (id: string) => {
    return useInfiniteQuery({
        queryKey: ['playlists', 'user', id],
        queryFn: ({ pageParam = 1 }) => playlistService.getUserPlaylist(id, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (!lastPage?.data) return undefined;
            
            const { current_page, last_page: totalPages } = lastPage.data;
            return current_page < totalPages ? current_page + 1 : undefined;
        },
        retry: 1,
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
};

export const useAddSongToPlaylist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { playlistId: string, songId: string }) => 
            playlistService.addSongToPlaylist(data.playlistId, data.songId),
        onSuccess: (_, data) => {
            queryClient.invalidateQueries({ queryKey: ['playlists', 'songs', data.playlistId] });
            queryClient.invalidateQueries({ queryKey: ['playlists', data.playlistId] });
            queryClient.invalidateQueries({ queryKey: ['playlists'] });
        },
    });
};

export const useRemoveSongFromPlaylist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { playlistId: string, songId: string }) => 
            playlistService.removeSongFromPlaylist(data.playlistId, data.songId),
        onSuccess: (_, data) => {
            queryClient.invalidateQueries({ queryKey: ['playlists', 'songs', data.playlistId] });
            queryClient.invalidateQueries({ queryKey: ['playlists', data.playlistId] });
            queryClient.invalidateQueries({ queryKey: ['playlists'] });
        },
    });
};