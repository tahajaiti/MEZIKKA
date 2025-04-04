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

        startStopSequencer: async () => {
            await Tone.start();
            Tone.getTransport().bpm.value = get().bpm;

            if (get().isPlaying) {
                Tone.getTransport().stop();
            } else {
                Tone.getTransport().start();
            }

            set(state => ({ isPlaying: !state.isPlaying }));
        }
    }
});