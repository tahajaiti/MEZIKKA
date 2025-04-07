import Profile from "./Profile";

type Role = {
    id: number,
    name: string,
}

interface User {
    id: number,
    name: string,
    email: string,
    role_id: number,
    role: Role,
    profile: Profile,
    created_at: string,
    updated_at: string
}

export default User;