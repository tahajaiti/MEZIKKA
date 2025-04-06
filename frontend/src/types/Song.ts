import { DrumData } from "./Drums";
import Genre from "./Genre";
import User from "./User";

interface SongData {
    id: number;
    name: string
    description: string;
    file_path: string;
    cover_path: string;
    genre: Genre;
    metadata: DrumData;
    user: User;
    created_at: string;
    updated_at: string;
}

export default SongData;