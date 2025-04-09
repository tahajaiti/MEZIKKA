export interface PlayerState {
    isPlaying: boolean;
    songUrl: string | null;
    duration: number;
    progress: number;

    startStopPlayer: () => Promise<void>;
    setSong: (songUrl: string) => Promise<void>;
    setProgress: (progress: number) => void;
    updateProgress: () => void;
}