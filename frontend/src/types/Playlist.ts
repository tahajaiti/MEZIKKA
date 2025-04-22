import SongData from "./Song";
import User from "./User";



export interface PlaylistData {
    id: number;
    title: string;
    description: string;
    cover: string;
    created_at: string;
    updated_at: string;
    user: User;
    songs: SongData[];
    song_count: number;
    likes_count: number;
}