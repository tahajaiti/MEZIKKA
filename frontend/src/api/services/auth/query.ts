import { useMutation,  } from "@tanstack/react-query";
import useAuthStore from "../../../stores/authStore";
import authService from "./service";

export const useLogin = () => {
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

export const useSignup = () => {
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

export const useLogout = () => {
    const { clearAuth } = useAuthStore();

    return useMutation({
        mutationFn: authService.logout,
        onSuccess: () => {
            clearAuth();
            console.log("Logged out successfully.");
        },
        onError: (error) => {
            console.error("Logout error:", error);
        }
    });
};