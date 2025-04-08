export interface PlayerState {
    isPlaying: boolean;
    songUrl: string | null;
    

    startStopPlayer: () => Promise<void>;
    setSong: (songUrl: string) => Promise<void>;
}