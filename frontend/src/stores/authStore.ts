import { create } from "zustand";
import { AuthState } from "../types/Auth";


const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user") || "null") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    setAuth: (token, user) => set({ token, user, isAuthenticated: true }),
    clearAuth: () => set({ token: null, user: null, isAuthenticated: false }),
}));

export default useAuthStore;