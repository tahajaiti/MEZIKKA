import { useMutation, UseMutationResult } from "@tanstack/react-query";
import AuthData, { creds } from "../../../types/Auth";
import Response from "../../../types/Response";
import useAuthStore from "../../../stores/authStore";
import authService from "./service";

export const useLogin = (): UseMutationResult<
    Response<AuthData>, 
    Error,
    Pick<creds, 'email' | 'password'>,
    unknown
> => {
    const { setAuth } = useAuthStore();

    return useMutation({
        mutationFn: authService.login,
        onSuccess: (res) => {
            if (!res.data) {
                throw new Error("No data returned");
            }
            const { token, user } = res.data;
            setAuth(token, user);
        },
        onError: (error) => {
            console.error("Login error:", error);
        }
    });
}

export const useSignup = (): UseMutationResult<
    Response<AuthData>,
    Error,
    creds
> => {
    const { setAuth } = useAuthStore();

    return useMutation({
        mutationFn: authService.register,
        onSuccess: (res) => {
            if (!res.data) {
                throw new Error("No data returned");
            }
            const { token, user } = res.data;
            setAuth(token, user);
        },
        onError: (error) => {
            console.log("Signup error:", error);
        }
    });
}