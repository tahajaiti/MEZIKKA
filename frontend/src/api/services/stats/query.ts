import { useQuery } from "@tanstack/react-query"
import statsService from "./service"






export const useGetStats = () => {
    return useQuery({
        queryKey: ["stats"],
        queryFn: () => statsService.getStats,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })
}