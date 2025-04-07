import { create } from "zustand";
import { AuthState } from "../types/Auth";
import { router } from "../router";
import resetAll from "./resetStores";

const getLocalToken = () => localStorage.getItem("token") || null;
const getLocalUser = () => {
    try {
        return JSON.parse(localStorage.getItem("user") || "null");
    } catch (error) {
        console.error("Failed to parse local user data:", error);
        return null;
    }
};

const useAuthStore = create<AuthState>((set) => ({
    token: getLocalToken(),
    user: getLocalUser(),
    isAuthenticated: !!getLocalToken(),

    setAuth: (token, user) => {
        try {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            set({ token, user, isAuthenticated: true });
        } catch (error) {
            console.error("Error saving authentication data:", error);
        }
    },

    clearAuth: () => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            set({ token: null, user: null, isAuthenticated: false });

            resetAll();

            setTimeout(() => {
                router.navigate({ to: "/login", replace: true });
            }, 0);
        } catch (error) {
            console.error("Error clearing authentication:", error);
            router.navigate({ to: "/login", replace: true });
        }
    },
}));

export const logout = () => useAuthStore.getState().clearAuth();

export default useAuthStore;