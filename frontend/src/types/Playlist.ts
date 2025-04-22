import User from "./User";



export interface PlaylistData {
    id: number;
    title: string;
    description: string;
    cover: string;
    created_at: string;
    updated_at: string;
    user: User;
    song_count: number;
    likes_count: number;
}