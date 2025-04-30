import { useInfiniteQuery, useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import followService from "./service";
import { Follow } from "../../../types/Follow";
import Response from "../../../types/Response";


export const useGetFollows = (id: string | number): UseQueryResult<Response<Follow>, Error> => {
    return useQuery({
        queryKey: ['user-follows', id],
        queryFn: () => followService.getFollows(id),
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
};

export const useInfiniteFollows = (id: string | number, type: 'followers' | 'follows' = 'follows') => {
    return useInfiniteQuery({
        queryKey: ['user', id, type, 'infinite'],
        queryFn: ({ pageParam = 1 }) => followService.getFollows(id, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const paginationData = lastPage.data?.[type];

            if (!paginationData) return undefined;

            const { current_page, last_page } = paginationData;
            return current_page < last_page ? current_page + 1 : undefined;
        },
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
};

export const useFollow = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string | number) => followService.follow(id),
        onSuccess: (_res, id) => {
            queryClient.invalidateQueries({ queryKey: ['user-follows', id] });
            queryClient.invalidateQueries({ queryKey: ['user', id, 'followers', 'infinite'] });
            queryClient.invalidateQueries({ queryKey: ['user', id, 'follows', 'infinite'] });
        },
        onError: (error) => {
            console.error("Error following user", error);
        },
    });
};

export const useUnfollow = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string | number) => followService.unfollow(id),
        onSuccess: (_res, id) => {
            queryClient.invalidateQueries({ queryKey: ['user-follows', id] });
            queryClient.invalidateQueries({ queryKey: ['user', id, 'followers', 'infinite'] });
            queryClient.invalidateQueries({ queryKey: ['user', id, 'follows', 'infinite'] });
        },
        onError: (error) => {
            console.error("Error unfollowing user", error);
        },
    });
};

export const useToggleFollow = (isFollowing: boolean) => {
    const queryClient = useQueryClient();
    const mutationFn = isFollowing ? followService.unfollow : followService.follow;

    return useMutation({
        mutationFn: (id: string | number) => mutationFn(id),
        onSuccess: (_res, id) => {
            queryClient.invalidateQueries({ queryKey: ['user-follows', id] });
            queryClient.invalidateQueries({ queryKey: ['user', id, 'followers', 'infinite'] });
            queryClient.invalidateQueries({ queryKey: ['user', id, 'follows', 'infinite'] });
            queryClient.invalidateQueries({ queryKey: ['user', id] }); 
        },
        onError: (err) => {
            console.error("Follow toggle failed", err);
        },
    });
};
