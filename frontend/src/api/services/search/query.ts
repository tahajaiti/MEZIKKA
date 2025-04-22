import { useQuery } from "@tanstack/react-query"
import searchService from "./service";




const useSearch = (query: string, enabled = true) => {
    return useQuery({
        queryKey: ["search", query],
        queryFn: () => searchService.search(query),
        enabled: enabled && query.length > 0,
        staleTime: 1000 * 60 * 5,
    });
}


export default useSearch;