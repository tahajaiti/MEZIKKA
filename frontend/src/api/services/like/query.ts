import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import likeService from "./service";

export const useGetLikes = () => {
    return useQuery({
        queryKey: ['likes', 'all'],
        queryFn: likeService.getLikes,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
};

export const useGetLikeCount = (type: string, id: string | number) => {
    return useQuery({
        queryKey: ['like-count', type, id],
        queryFn: () => likeService.getLikeCount(type, id),
        staleTime: 5 * 60 * 1000,
        retry: 1,
        enabled: !!type && !!id,
    });
};

export const useInfiniteSongLikes = () => {
    return useInfiniteQuery({
        queryKey: ['likes', 'infinite'],
        queryFn: ({ pageParam = 1 }) => likeService.getLikedSongs(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (!lastPage?.data) return undefined;
            const { current_page, last_page: totalPages } = lastPage.data;
            return current_page < totalPages ? current_page + 1 : undefined;
        },
        retry: 1,
        staleTime: 5 * 60 * 1000,
    });
};

export const useToggleLike = (type: string, id: string | number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => likeService.toggleLike(type, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['likes', 'all'] });
            queryClient.invalidateQueries({ queryKey: ['like-count', type, id] });
            queryClient.invalidateQueries({ queryKey: ['likes', 'infinite'] });
        },
        onError: (error) => {
            console.error(`Error toggling like for ${type} ${id}:`, error); 
        },
    });
};