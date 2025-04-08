import { create } from 'zustand';
import * as Tone from 'tone';
import { PlayerState } from '../types/Payer';


const initialState = {
    isPlaying: false,
    songFile: null,
}


const usePlayerStore = create<PlayerState>((set, get) => {

    const transport = Tone.getTransport();

    return {
        ...initialState,

        startStopPlayer: async () => {
            await Tone.start();

            if (get().isPlaying){
                transport.stop();
            } else {
                transport.start();
            }

            set(state => ({isPlaying: !state.isPlaying}));
        }   

    }
});


export default usePlayerStore;