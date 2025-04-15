import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
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
    const follow = useFollow()
    const unfollow = useUnfollow()

    return isFollowing ? unfollow : follow
}
