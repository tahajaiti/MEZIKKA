import Profile from "./Profile";
import User from "./User";

interface AuthData {
    token: string;
    token_type: string;
    user: User;
}

export interface creds {
    name: string;
    email: string;
    password: string;
}

export interface AuthState {
    token: string | null;
    user: User | null;
    profile: Profile | null;
    isAuthenticated: boolean;
    setAuth: (token: string, user: User) => void;
    setProfile: (profile: Profile) => void;
    clearAuth: () => void;
}

export default AuthData;