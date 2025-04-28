import { useQuery } from "@tanstack/react-query"
import statsService from "./service"

export const useGetUserStats = (period: number) => {
    return useQuery({
        queryKey: ["user-stats", period],
        queryFn: () => statsService.getUserStats(period),
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })
}

export const useGetSongStats = (period: number) => {
    return useQuery({
        queryKey: ["song-stats", period],
        queryFn: () => statsService.getSongStats(period),
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })
}

export const useGetPlaylistStats = (period: number) => {
    return useQuery({
        queryKey: ["playlist-stats", period],
        queryFn: () => statsService.getPlaylistStats(period),
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })
}

export const useGetLikeStats = (period: number) => {
    return useQuery({
        queryKey: ["like-stats", period],
        queryFn: () => statsService.getLikeStats(period),
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })
}