import { create } from 'zustand';
import { registerStoreReset } from './resetStores';

interface LikeStore {
    likedSongs: Set<number | string>;
    likedPlaylists: Set<number | string>;
    likeCounts: Record<number, number>;
    toggleLike: (type: 'song' | 'playlist', id: number | string) => void;
    setLikes: (songs: number[], playlists: number[]) => void;
    setLikeCount: (id: number, count: number) => void;
    reset: () => void;
}

const initialState = {
    likedSongs: new Set<number | string>(),
    likedPlaylists: new Set<number | string>(),
    likeCounts: {},
};

const useLikeStore = create<LikeStore>((set) => {
    registerStoreReset(() => set(initialState));
    return {
        ...initialState,
        reset: ( ) => set(initialState),
        toggleLike: (type, id) => {
            set((state) => {
                const targetSet = type === 'song' ? new Set(state.likedSongs) : new Set(state.likedPlaylists);
                if (targetSet.has(id)) {
                    targetSet.delete(id);
                } else {
                    targetSet.add(id);
                }
                return type === 'song'
                    ? { likedSongs: targetSet }
                    : { likedPlaylists: targetSet };
            });
        },
        setLikes: (songs, playlists) => {
            set({
                likedSongs: new Set(songs),
                likedPlaylists: new Set(playlists),
            });
        },
        setLikeCount: (id, count) => {
            set((state) => ({
                likeCounts: { ...state.likeCounts, [id]: count }
            }));
        }
    }
});

export default useLikeStore;
