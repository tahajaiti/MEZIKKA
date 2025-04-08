import { create } from 'zustand';
import * as Tone from 'tone';
import { PlayerState } from '../types/Player';
import useToastStore from './useToastStore';
import songService from '../api/services/song/service';

const initialState = {
    isPlaying: false,
    songUrl: null,
};

const usePlayerStore = create<PlayerState>((set, get) => {
    const toastStore = useToastStore.getState();

    const player = new Tone.Player().toDestination();

    return {
        ...initialState,

        startStopPlayer: async () => {
            const state = get();
            await Tone.start();
            console.log('Starting/stopping player:', state.isPlaying);

            if (!state.songUrl) return;
            const songUrl = state.songUrl;

            const audioData = await songService.getSongFile(songUrl!);

            if (!state.isPlaying) {
                if (!audioData) {
                    toastStore.showToast('Failed to load song', 'error');
                    return;
                }

                const audio = await Tone.getContext().decodeAudioData(audioData);

                player.buffer = new Tone.ToneAudioBuffer(audio);
                player.start();
            } else {
                player.stop();
            }

            set({ isPlaying: !state.isPlaying });
        },

        setSong: async (songUrl: string) => {
            if (!songUrl) return;
            set({ songUrl: songUrl });

        }
    };
});

export default usePlayerStore;