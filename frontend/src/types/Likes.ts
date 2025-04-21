import SongData from "./Song";

export interface LikesGet {
    songs: number[];
    playlists: number[];
}

export interface Likes {
    songs?: SongData[];
    playlists?: SongData[];
}


export interface LikeData {
    liked_by_user: boolean;
}