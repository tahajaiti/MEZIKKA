import { useMutation, useQuery } from "@tanstack/react-query";
import likeService from "./service";


export const useGetLikes = () => {
    return useQuery({
        queryKey: [`likes-${new Date()}`],
        queryFn: likeService.getLikes,
        staleTime: 5 * 60 * 1000,
        retry: 1
    })
}

export const useGetLikeCount = (type: string, id: string | number) => {
    return useQuery({
        queryKey: [`like-count-${new Date()}`],
        queryFn: () => likeService.getLikeCount(type, id),
        staleTime: 5 * 60 * 1000,
        retry: 1
    });
};

export const useToggleLike = (type: string, id: string | number) => {
    return useMutation({
        mutationFn: () => likeService.toggleLike(type, id),
        onSuccess: (data) => {
            console.log("Like toggled successfully", data);
        },
        onError: (error) => {
            console.error("Error toggling like", error);
        }
    });
}