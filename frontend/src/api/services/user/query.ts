import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userService from "./service";

import useAuthStore from "../../../stores/authStore";



export const useGetUser = (id: string | number) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => userService.getUserById(id),
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    const { setProfile } = useAuthStore.getState();

    return useMutation({
        mutationFn: (data: FormData) => userService.updateProfile(data),
        onSuccess: (res) => {
            if (res.data) {
                const id = res.data.id;
                queryClient.invalidateQueries({ queryKey: ['user', id] });
                setProfile(res.data);
            }
        },
        onError: (res) => {
            console.log(res);
        }
    });
} 

export const useGetPaginatedUsers = (page: number) => {
    return useQuery({
        queryKey: ['users', page],
        queryFn: () => userService.getPaginated(page),
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
}