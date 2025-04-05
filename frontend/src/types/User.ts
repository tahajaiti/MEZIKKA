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
    created_at: Date,
    updated_at: Date
}

export default User;