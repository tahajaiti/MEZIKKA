import { InfiniteData, useInfiniteQuery, UseInfiniteQueryResult, useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import followService from "./service";
import { Follow } from "../../../types/Follow";
import Response from "../../../types/Response";


export const useGetFollows = (id: string | number): UseQueryResult<Response<Follow>, Error> => {
    return useQuery({
        queryKey: ['followers', id],
        queryFn: () => followService.getFollows(id),
        staleTime: 5 * 60 * 1000,
        retry: 1,
    })
}

export const useInfiniteFollows = (id: string | number, type: 'followers' | 'follows' = 'follows')
    : UseInfiniteQueryResult<InfiniteData<Response<Follow>>, Error> => {
    return useInfiniteQuery({
        queryKey: ['followers', id],
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

export const useFollow = (): UseMutationResult<Response<null>, Error, string | number> => {
    return useMutation({
        mutationFn: (id: string | number) => followService.follow(id),
        onSuccess: (res) => {
            console.log("Song created successfully", res);
        },
        onError: (error) => {
            console.error("Error creating song", error);
        },
    });
}

export const useUnfollow = (): UseMutationResult<Response<null>, Error, string | number> => {
    return useMutation({
        mutationFn: (id: string | number) => followService.unfollow(id),
        onSuccess: (res) => {
            console.log("Song created successfully", res);
        },
        onError: (error) => {
            console.error("Error creating song", error);
        },
    });
}

export const useToggleFollow = (isFollowing: boolean) => {
    const queryClient = useQueryClient();

    const mutationFn = isFollowing
        ? followService.follow
        : followService.unfollow;

    return useMutation({
        mutationFn: (id: string | number) => mutationFn(id),
        onSuccess: (_res, userId,) => {
            queryClient.invalidateQueries({ queryKey: ['followers', userId] });
            queryClient.invalidateQueries({ queryKey: ['user', userId] });
        },
        onError: (err) => {
            console.error("Follow toggle failed", err);
        },
    });
};
