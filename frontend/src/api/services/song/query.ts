import { useMutation, UseMutationResult } from "@tanstack/react-query";
import Response from "../../../types/Response";
import songService from "./service";
import SongData from "../../../types/Song";



export const useCreateSong = (): UseMutationResult<
    Response<SongData>,
    Error,
    FormData
> => {
    return useMutation({
        mutationFn: (song: FormData) => songService.createSong(song),
        onSuccess: (res) => {
            console.log("Song created successfully", res);
        },
        onError: (error) => {
            console.error("Error creating song", error);
        },
    });
}
