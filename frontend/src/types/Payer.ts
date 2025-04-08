


export interface PlayerState {
    isPlaying: boolean;
    songFile: File | null;
    

    startStopPlayer: () => Promise<void>;

}