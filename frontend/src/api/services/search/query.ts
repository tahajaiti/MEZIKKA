import { useQuery } from "@tanstack/react-query"
import searchService from "./service";




export const useSearch = (query: string, enabled = true) => {
    return useQuery({
        queryKey: ["search", "songs", query],
        queryFn: () => searchService.search(query),
        enabled: enabled && query.length > 0,
        staleTime: 1000 * 60 * 5,
    });
}

export const useUserSearch = (query: string, enabled = true) => {
    return useQuery({
        queryKey: ["search", "users", query],
        queryFn: () => searchService.userSearch(query),
        enabled: enabled && query.length > 0,
        staleTime: 1000 * 60 * 5,
    });
}
