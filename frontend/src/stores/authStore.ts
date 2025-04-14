import { create } from "zustand";
import { AuthState } from "../types/Auth";
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
const getLocalProfile = () => {
    try {
        const profile = localStorage.getItem("profile");
        return profile ? JSON.parse(profile) : null;
    } catch (err) {
        console.error("Failed to parse local profile:", err);
        return null;
    }
};


const useAuthStore = create<AuthState>((set) => {

    return {
        token: getLocalToken(),
        user: getLocalUser(),
        profile: getLocalProfile(),
        isAuthenticated: !!getLocalToken(),

        setAuth: (token, user) => {
            try {
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("profile", JSON.stringify(user.profile));
                set({ token, user, profile: user.profile, isAuthenticated: true });
            } catch (error) {
                console.error("Error saving authentication data:", error);
            }
        },

        clearAuth: () => {
            try {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.removeItem("profile");
                set({ token: null, user: null, profile: null, isAuthenticated: false });

                resetAll();
            } catch (error) {
                console.error("Error clearing authentication:", error);
            }
        },
    }
});

export const logout = () => useAuthStore.getState().clearAuth();

export default useAuthStore;