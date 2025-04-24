import { useQuery } from "@tanstack/react-query"
import searchService from "./service";




export const useSearch = (query: string, sort: string = "newest", enabled = true) => {
    return useQuery({
        queryKey: ["search", "songs", query, sort],
        queryFn: () => searchService.search(query, sort),
        enabled: enabled && query.length > 0,
        staleTime: 1000 * 60 * 5,
    });
}

export const useUserSearch = (query: string, sort: string = "newest", enabled = true) => {
    return useQuery({
        queryKey: ["search", "users", query, sort],
        queryFn: () => searchService.userSearch(query, sort),
        enabled: enabled && query.length > 0,
        staleTime: 1000 * 60 * 5,
    });
}

export const usePlaylistSearch = (query: string, sort: string = "newest", enabled = true) => {
    return useQuery({
        queryKey: ["search", "playlists", query, sort],
        queryFn: () => searchService.playlistSearch(query, sort),
        enabled: enabled && query.length > 0,
        staleTime: 1000 * 60 * 5,
    });
}