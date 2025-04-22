import { useQuery } from "@tanstack/react-query"
import playlistService from "./service"








export const useGetPlaylists = () => {
    return useQuery({
        queryKey: ['playlists'],
        queryFn: playlistService.getPlaylists,
    });
}