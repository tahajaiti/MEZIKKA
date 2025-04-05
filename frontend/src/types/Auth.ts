import User from "./User";

interface AuthData {
    token: string;
    token_type: string;
    user: User;
}

export default AuthData;