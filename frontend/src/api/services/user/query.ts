import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userService from "./service";
import useAuthStore from "../../../stores/authStore";

export const useGetUser = (id: string | number) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => userService.getUserById(id),
        staleTime: 5 * 60 * 1000,
        retry: 1,
        enabled: !!id,
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
                queryClient.invalidateQueries({ queryKey: ['users'] });
                setProfile(res.data);
            }
        },
        onError: (error) => {
            console.error('Profile update failed:', error); 
        },
    });
};

export const useGetPaginatedUsers = (page: number) => {
    return useQuery({
        queryKey: ['users', page],
        queryFn: () => userService.getPaginated(page),
        staleTime: 5 * 60 * 1000,
        retry: 1,
        enabled: page > 0,
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { id: number }) => userService.deleteUser(data.id),
        onSuccess: (_, data) => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['user', data.id] });
        },
        onError: (error) => {
            console.error('User deletion failed:', error);
        },
    });
};