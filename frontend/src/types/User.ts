import Profile from "./Profile";

type Role = {
    id: number,
    name: string,
}

export interface User {
    id: number,
    name: string,
    email: string,
    role_id: number,
    role: Role,
    profile: Profile,
    created_at: string,
    updated_at: string
}


export interface UserResponse {
    user: User,
    is_following: boolean,
}

export default User;