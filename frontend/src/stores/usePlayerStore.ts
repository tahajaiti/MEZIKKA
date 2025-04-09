import { create } from 'zustand';
// import { PlayerState } from '../types/Player';
import useToastStore from './useToastStore';

const initialState = {
    context: new AudioContext(),
    source: null,
    buffer: null,
    gainNode: null,
    startTime: 0,
    elapsedTime: 0,
    duration: 0,
    isPlaying: false,
    volume: 0.5,
};

interface State {
    context: AudioContext | null;
    source: AudioBufferSourceNode | null;
    buffer: AudioBuffer | null;
    gainNode: AudioNode | null;
    startTime: number;
    elapsedTime: number;
    duration: number;
    isPlaying: boolean;
    volume: number;

    mount: (buffer: ArrayBuffer) => Promise<void>;
    play: () => void;
    pause: () => void;
    toggle: () => void;
    setVolume: (vol: number) => void;
}

const usePlayerStore = create<State>((set, get) => {
    const toastStore = useToastStore.getState();
    const context = new AudioContext();
    const gainNode = context.createGain();

    return {
        ...initialState,
        context,

        mount: async (buffer) => {
            const ctx = get().context;
            if (!ctx) return;

            try {
                const audioBuffer = await ctx.decodeAudioData(buffer);
                set({
                    buffer: audioBuffer,
                    duration: audioBuffer.duration,
                    elapsedTime: 0
                });
            } catch (err) {
                console.error(err);
                toastStore.showToast('Failed to load audio, please refresh the page', 'error');
            }
        },
        play: () => {
            const { context, buffer, source, isPlaying, elapsedTime, volume } = get();
            if (!context || !isPlaying || !buffer) return;
            if (source) source.stop();

            const src = context.createBufferSource();
            src.buffer = buffer;
            src.connect(gainNode);

            gainNode.connect(context.destination);
            gainNode.gain.setValueAtTime(volume, context.currentTime);

            src.onended = () => {
                if (get().isPlaying) {
                    set({ isPlaying: false, elapsedTime: 0, source: null });
                }
            }

            src.start(0, elapsedTime);
            set({
                source: src,
                isPlaying: true,
                startTime: context.currentTime
            });
        },

        pause: () => {
            const { source, context, startTime, isPlaying } = get();
            if (!source || !context || !isPlaying) return;

            const elapsed = context.currentTime - startTime + get().elapsedTime;
            source.stop();
            source.disconnect();

            set({
                isPlaying: false,
                source: null,
                elapsedTime: elapsed > get().duration ? 0 : elapsed
            });
        },

        toggle: () => {
            const { isPlaying } = get();
            if (isPlaying) {
                get().pause();
            } else {
                get().play();
            }
        },

        setVolume: (vol) => {
            const ctx = get().context;
            if (!ctx) {set({volume: vol}); return};

            const clampedVolume = Math.max(0, Math.min(1, vol));
            gainNode.gain.setValueAtTime(clampedVolume, ctx.currentTime);
            set({ volume: clampedVolume });
        },
    }
});

export default usePlayerStore;