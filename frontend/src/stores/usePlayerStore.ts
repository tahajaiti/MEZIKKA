import { create } from 'zustand';
import SongData from '../types/Song';


interface PlayerStore {
    currentSong: SongData | null;
    isPlaying: boolean;
    volume: number;
    setSong: (song: SongData) => void;
    setIsPlaying: (isPlaying: boolean) => void;
    setVolume: (volume: number) => void;
}

const initialState = {
    currentSong: null,
    isPlaying: false,
    volume: 1
}

const usePlayerStore = create<PlayerStore>((set) => {

    return {
        ...initialState,

        setSong: (song: SongData) => {
            set({ currentSong: song });
        },
        setIsPlaying: (isPlaying: boolean) => {
            set({ isPlaying });
        },
        setVolume: (volume: number) => {
            set({ volume });
        }
    }
})




export default usePlayerStore;