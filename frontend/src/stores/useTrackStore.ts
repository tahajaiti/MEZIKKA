import { create } from 'zustand';
import * as Tone from 'tone';
import DRUM_DATA, { PRESETS, STEPS } from '../util/DrumData';
import { DrumData, DrumSequencerState } from '../types/Drums';
import { registerStoreReset } from './resetStores';


const initialSequences: Record<string | number, boolean[]> = {};
DRUM_DATA.forEach(p => {
    initialSequences[p.id] = Array(STEPS).fill(false);
});


const initialState = {
    isPlaying: false,
    bpm: 120,
    sequences: initialSequences,
    customSoundUrl: '',
    customSoundName: '',
    drums: DRUM_DATA,
    currentStep: 0,
    mutedPads: new Set<string>(),
    saveFormOpen: false,
    songId: null,
};

const useTrackStore = create<DrumSequencerState>((set, get) => {
    registerStoreReset(() => set(initialState));
    const transport = Tone.getTransport();

    return {
        ...initialState,
        reset: () => set(initialState),

        getSequences: () => get().sequences,

        openCloseForm: () => set(state => ({ saveFormOpen: !state.saveFormOpen })),

        startStopSequencer: async () => {
            await Tone.start();
            transport.bpm.value = get().bpm;

            if (get().isPlaying) {
                transport.stop();
            } else {
                transport.start(Tone.now());
            }
            set({ isPlaying: !get().isPlaying });
        },


        updateBpm: (newBpm: number) => {
            transport.bpm.value = newBpm;
            set({ bpm: newBpm });
        },

        updateVolume: (id: number | string, newVolume: number) => {
            set(state => ({
                drums: state.drums.map(pad =>
                    pad.id === id ? { ...pad, volume: newVolume } : pad
                )
            }));
        },

        addCustomDrum: () => {
            const { customSoundUrl, customSoundName } = get();
            if (!customSoundUrl || !customSoundName) return;

            const newDrum = {
                id: Date.now(),
                name: customSoundName,
                soundUrl: customSoundUrl,
                volume: 0.5,
            };

            set(state => ({
                drums: [...state.drums, newDrum],
                sequences: { ...state.sequences, [newDrum.id]: Array(STEPS).fill(false) },
                customSoundName: '',
                customSoundUrl: '',
            }));
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

        getSongData: () => {
            const state = get();
            return {
                bpm: state.bpm,
                sequences: state.sequences,
                drums: state.drums,
                currentStep: state.currentStep,
                mutedPads: Array.from(state.mutedPads),
            };
        },

        setSongId: (id: string) => set({ songId: id }),

        loadSong: (songData: DrumData, id: string) => {
            if (!songData || !id) return;
            transport.bpm.value = songData.bpm;
            set({
                songId: `MEZ-${id}`,
                bpm: songData.bpm,
                sequences: songData.sequences,
                drums: songData.drums,
                currentStep: songData.currentStep,
                mutedPads: new Set(songData.mutedPads),
            });
        },

        deleteDrum: (id: number) => {
            set(state => {
                if (!state.drums.some((d) => d.id === id)) return state;
                const newDrums = state.drums.filter((d) => d.id !== id);

                const newSequences = { ...state.sequences };
                delete newSequences[id];

                const newMutedPads = new Set(state.mutedPads);
                newMutedPads.delete(id);

                return {
                    drums: newDrums,
                    sequences: newSequences,
                    mutedPads: newMutedPads,
                };
            })
        },

        clearPad: (id: number) => {
            set(state => {
                const newSequences = { ...state.sequences };
                if (newSequences[id]) {
                    newSequences[id] = Array(STEPS).fill(false);
                }
                return { sequences: newSequences };
            });
        },
        setPreset: (name: string) => {
            const preset = PRESETS.find(p => p.name === name);
            if (!preset) return;
            set({ drums: preset.sounds, sequences: initialSequences });
        }
    }
});

export default useTrackStore;