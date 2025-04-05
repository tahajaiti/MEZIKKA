import { create } from "zustand";
import { AuthState } from "../types/Auth";


const useAuthStore = create<AuthState>((set) => ({
    token: null,
    user: null,
    isAuthenticated: false,
    setAuth: (token, user) => set({ token, user, isAuthenticated: true }),
    clearAuth: () => set({ token: null, user: null, isAuthenticated: false }),

}));

export default useAuthStore;