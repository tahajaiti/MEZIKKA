import { create } from 'zustand';
// import { PlayerState } from '../types/Player';
import useToastStore from './useToastStore';

const initialState = {
    context: new AudioContext(),
    source: null,
    buffer: null,
    startTime: 0,
    pausedAt: 0,
    duration: 0,
    isPlaying: false,
};

interface State {
    context: AudioContext | null;
    source: AudioBufferSourceNode | null;
    buffer: AudioBuffer | null;
    startTime: number;
    pausedAt: number;
    duration: number;
    isPlaying: boolean;

    loadAudio: (buffer: ArrayBuffer) => Promise<void>;
    play: () => void;
    pause: () => void;
    playAndPause: () => void;

}

const usePlayerStore = create<State>((set, get) => {
    const toastStore = useToastStore.getState();

    return {
        ...initialState,
        context: new AudioContext(),

        loadAudio: async (buffer: ArrayBuffer) => {
            const ctx = get().context;
            if (!ctx) return;
            
            try {
                const decoded = await ctx.decodeAudioData(buffer);
                set({buffer: decoded, duration: decoded.duration});
            } catch (err) {
                console.error('Error loading audio:', err);
            }
        },

        play: () => {
            const { context, buffer, isPlaying, pausedAt } = get();
            if (!context || !buffer || isPlaying) return;

            const source = context.createBufferSource();
            source.buffer = buffer;
            source.connect(context.destination);

            const offset = pausedAt;
            source.start(0, pausedAt);


            source.onended = () => set({isPlaying: false, pausedAt: 0});

            set({ 
                source, 
                isPlaying: true, 
                startTime: context.currentTime - offset, 
                pausedAt: 0 
            });
        },

        pause: () => {
            const {source, context, startTime} = get();
            if (!source || !context) return;
            console.log('Pausing audio');

            const currentTime = context.currentTime;
            const pausedAt = currentTime - startTime;
            
            console.log('Paused at:', pausedAt);

            source.stop();
            set({ isPlaying: false, pausedAt: pausedAt });
        },

        playAndPause: () => {
            const { isPlaying } = get();
            if (isPlaying) {
                get().pause();
                toastStore.showToast('Paused', 'info');
            } else {
                get().play();
                toastStore.showToast('played', 'info');
            }
        }
    }
});

export default usePlayerStore;