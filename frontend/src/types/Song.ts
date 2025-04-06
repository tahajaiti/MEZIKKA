import { DrumData } from "./Drums";

interface SongData {
    id: number;
    name: string
    description: string;
    file_path: string;
    cover_path: string;
    genre_id: number;
    metadata: DrumData;
    created_at: string;
    updated_at: string;
}

export default SongData;