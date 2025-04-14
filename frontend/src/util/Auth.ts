import { useNavigate } from "react-router";
import useAuthStore from "../stores/authStore";

export const useAuth = () => {
    const navigate = useNavigate();
    const authStore = useAuthStore();

    const logout = () => {
        authStore.clearAuth();
        setTimeout(() => {
            navigate("/login", { replace: true });
        }, 100);
    };

    return {
        ...authStore,
        logout,
    };
};