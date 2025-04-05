import { create } from 'zustand';
import * as Tone from 'tone';
import DRUM_DATA, { STEPS } from '../util/DrumData';
import { DrumSequencerState } from '../types/Drums';



const useTrackStore = create<DrumSequencerState>((set, get) => {

    const initialSequences: Record<string | number, boolean[]> = {};
    DRUM_DATA.forEach(p => {
        initialSequences[p.id] = Array(STEPS).fill(false);
    });

    return {
        isPlaying: false,
        bpm: 120,
        sequences: initialSequences,
        customSoundUrl: '',
        customSoundName: '',
        drums: DRUM_DATA,
        currentStep: 0,
        mutedPads: new Set<number | string>(),
        isRecording: false,
        recorder: null,

        startStopSequencer: async () => {
            await Tone.start();
            Tone.getTransport().bpm.value = get().bpm;

            if (get().isPlaying) {
                Tone.getTransport().stop();
            } else {
                Tone.getTransport().start();
            }

            set(state => ({ isPlaying: !state.isPlaying }));
        },

        updateBpm: (newBpm: number) => {
            set({ bpm: newBpm });
            Tone.getTransport().bpm.value = newBpm;
        },

        updateVolume: (id: number | string, newVolume: number) => {
            set(state => ({
                drums: state.drums.map(pad =>
                    pad.id === id ? { ...pad, volume: newVolume } : pad
                )
            }));
        },

        addCustomDrum: () => {
            const { customSoundUrl, customSoundName, sequences } = get();

            if (customSoundUrl && customSoundName) {
                const newDrum = {
                    id: Date.now(),
                    name: customSoundName,
                    soundUrl: customSoundUrl,
                    volume: 0.5,
                }

                const newSequence = { ...sequences };
                newSequence[newDrum.id] = Array(STEPS).fill(false);

                set(state => ({
                    drums: [...state.drums, newDrum],
                    sequences: newSequence,
                    customSoundName: '',
                    customSoundUrl: '',
                }));
            }
        },

        setCustomSoundUrl: (url: string) => set({ customSoundUrl: url }),
        setCustomSoundName: (name: string) => set({ customSoundName: name }),
        setCurrentStep: (step: number) => set({ currentStep: step }),

        togglePad: (padId: number | string, stepIndex: number) => {
            set(state => {
                const currSequence = state.sequences[padId];
                if (!currSequence) return state;
                const newSequence = [...currSequence];
                newSequence[stepIndex] = !newSequence[stepIndex];

                return {
                    sequences: {
                        ...state.sequences,
                        [padId]: newSequence,
                    }
                };
            });
        },

        toggleMute: (padId: number | string) => {
            set(state => {
                const newMutedPads = new Set(state.mutedPads);
                if (newMutedPads.has(padId)) {
                    newMutedPads.delete(padId);
                } else {
                    newMutedPads.add(padId);
                }

                return { mutedPads: newMutedPads };
            })
        },

        startRecording: async () => {
            await Tone.start();

            if (!get().isPlaying) {
                await get().startStopSequencer();
            }

            const recorder = new Tone.Recorder();
            Tone.getDestination().connect(recorder);
            recorder.start();

            set({ recorder, isRecording: true });
        },

        stopRecordingAndExport: async () => {
            const { recorder, isPlaying } = get();

            if (isPlaying) {
                await get().startStopSequencer();
            }

            if (recorder) {
                const recording = await recorder.stop();
                const url = URL.createObjectURL(recording);
                const a = document.createElement('a');
                a.download = `track-${new Date().toISOString().split('T').join('-')}.webm`;
                a.href = url;
                a.click();
                URL.revokeObjectURL(url);
                recorder.dispose();
                a.remove();
                set({ recorder: null, isRecording: false });
            }
        },

        saveSong: (songKey: string) => {
            const state = get();
            const songData = {
                bpm: state.bpm,
                sequences: state.sequences,
                drums: state.drums,
                currentStep: state.currentStep,
                mutedPads: Array.from(state.mutedPads),
            }


            if (songKey) {
                localStorage.setItem(songKey, JSON.stringify(songData));
            }
        },

        loadSong: (songKey: string) => {
            const songData = localStorage.getItem(songKey);
            if (songData) {
                const parsedData = JSON.parse(songData);
                set({
                    bpm: parsedData.bpm,
                    sequences: parsedData.sequences,
                    drums: parsedData.drums,
                    currentStep: parsedData.currentStep,
                    mutedPads: new Set(parsedData.mutedPads),
                });
                Tone.getTransport().bpm.value = parsedData.bpm;
                alert(`Song loaded with ID: ${songKey}`);
            } else {
                alert(`No song found with ID: ${songKey}`);
            }
        }
    }
});

export default useTrackStore;