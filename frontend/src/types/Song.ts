interface SongData {
    id: number;
    name: string
    description: string;
    file_path: string;
    cover_path: string;
    genre_id: number;
    metadata: JSON;
    created_at: string;
    updated_at: string;
}

export default SongData;