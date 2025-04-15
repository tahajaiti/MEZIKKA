import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import userService from "./service";
import { UserResponse } from "../../../types/User";
import Profile from "../../../types/Profile";
import Response from "../../../types/Response";
import useAuthStore from "../../../stores/authStore";



export const useGetUser = (id: string | number): UseQueryResult<Response<UserResponse>, Error> => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => userService.getUserById(id),
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
};

export const useUpdateProfile = (): UseMutationResult<Response<Profile>, Error, FormData> => {
    const queryClient = useQueryClient();
    const { setProfile } = useAuthStore.getState();

    return useMutation({
        mutationFn: (data: FormData) => userService.updateProfile(data),
        onSuccess: (res) => {
            console.log(res);
            if (res.data) {
                queryClient.invalidateQueries({ queryKey: ['user', res.data?.id] });
                setProfile(res.data);
            }
        },
        onError: (res) => {
            console.log(res);
        }
    });
} 