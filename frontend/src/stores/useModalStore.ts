import { create } from 'zustand';
import SongData from '../types/Song';


interface store {
    isOpen: boolean;
    song: SongData | null;
    open: (song: SongData) => void;
    close: () => void;
}

const useModalStore = create<store>((set) => ({
    isOpen: false,
    song: null,
    open: (song) => {
        set({ isOpen: true, song });
    },
    close: () => {
        set({ isOpen: false });
    }
}));


export default useModalStore;