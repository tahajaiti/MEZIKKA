import SongData from "./Song";

export interface Likes {
    songs?: SongData[];
    playlists?: SongData[];
}


export interface LikeData {
    liked_by_user: boolean;
}