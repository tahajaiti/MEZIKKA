import { create } from 'zustand';


interface LikeStore {
    likedSongs: Set<number | string>;
    toggleLike: (songId: number | string) => void;
}


const useLikeStore = create<LikeStore>((set) => ({
    likedSongs: new Set<number | string>(),
    toggleLike: (songId) => {
        set((state) => {
            const updatedLikes = new Set(state.likedSongs);
            if (updatedLikes.has(songId)) {
                updatedLikes.delete(songId);
            } else {
                updatedLikes.add(songId);
            }
            return { likedSongs: updatedLikes };
        });
    }
}));

export default useLikeStore;