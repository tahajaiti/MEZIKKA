import User from "./User";

interface AuthData {
    token: string;
    token_type: string;
    user: User;
}

export interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    setAuth: (token: string, user: User) => void;
    clearAuth: () => void;
}

export default AuthData;