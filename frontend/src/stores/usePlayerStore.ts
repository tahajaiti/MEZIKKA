import { create } from 'zustand';
// import { PlayerState } from '../types/Player';
import useToastStore from './useToastStore';
import songService from '../api/services/song/service';

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
    arrayBuffer: null,
    currentSong: null,
};

interface State {
    context: AudioContext | null;
    source: AudioBufferSourceNode | null;
    buffer: AudioBuffer | null;
    gainNode: GainNode | null;
    startTime: number;
    elapsedTime: number;
    duration: number;
    isPlaying: boolean;
    volume: number;
    arrayBuffer: ArrayBuffer | null;
    currentSong: string | number | null;

    mount: (buffer: ArrayBuffer) => Promise<void>;
    play: () => void;
    pause: () => void;
    toggle: () => void;
    setVolume: (vol: number) => void;
    load: (id: string | number) => Promise<void>;
    seek: (time: number) => void;
    cleanup: () => void;
}

const usePlayerStore = create<State>((set, get) => {
    const toastStore = useToastStore.getState();
    const context = new window.AudioContext();
    const gainNode = context.createGain();

    return {
        ...initialState,
        context,
        gainNode,

        load: async (id) => {
            const arrayBuffer = get().arrayBuffer;
            if (arrayBuffer) set({ arrayBuffer: null });

            const res = await songService.getSongFile(id);
            if (!res) {
                toastStore.showToast('Failed to load audio, please refresh the page', 'error');
                return;
            }

            await get().mount(res);
            set({ arrayBuffer: res, currentSong: id });
        },

        mount: async (buffer) => {
            const ctx = get().context;
            if (!ctx) return;

            if (get().source) {
                get().cleanup();
            }

            try {
                const audioBuffer = await ctx.decodeAudioData(buffer);
                set({
                    buffer: audioBuffer,
                    duration: audioBuffer.duration,
                    elapsedTime: 0,
                    source: null,
                });
            } catch (err) {
                console.error(err);
                toastStore.showToast('Failed to load audio, please refresh the page', 'error');
            }
        },

        play: () => {
            const { context, buffer, gainNode, isPlaying } = get();
            if (!context || isPlaying || !buffer || !gainNode) return;
            if (get().source) { get().cleanup(); }



            const src = context.createBufferSource();
            src.buffer = buffer;
            src.connect(gainNode);
            gainNode.connect(context.destination);
            gainNode.gain.setValueAtTime(get().volume, context.currentTime);

            src.onended = () => {
                if (get().isPlaying) {
                    set({ isPlaying: false, elapsedTime: 0, source: null });
                }
            }

            src.start(0, get().elapsedTime % buffer.duration);
            set({
                source: src,
                isPlaying: true,
                startTime: context.currentTime - (get().elapsedTime % buffer.duration),
            });
        },

        pause: () => {
            const { source, context, isPlaying } = get();
            if (!source || !context || !isPlaying) return;

            const elapsed = context.currentTime - get().startTime;
            source.stop();
            source.disconnect();

            set({
                isPlaying: false,
                source: null,
                elapsedTime: elapsed > (get().duration || 0) ? 0 : elapsed
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
            const clampedVolume = Math.max(0, Math.min(1, vol));

            if (ctx && get().gainNode) {
                get().gainNode!.gain.setValueAtTime(clampedVolume, ctx.currentTime);
            }

            set({ volume: clampedVolume });
        },

        seek: (time) => {
            const { context, buffer, isPlaying } = get();
            if (!context || !buffer) return;

            const clampedTime = Math.max(0, Math.min(buffer.duration, time));

            if (isPlaying) {
                get().pause();
                set({ elapsedTime: clampedTime });
                get().play();
            } else {
                set({ elapsedTime: clampedTime });
            }
        },

        cleanup: () => {
            const src = get().source;
            if (src) {
                src.stop();
                src.disconnect();
            }
        }
    }
});

export default usePlayerStore;