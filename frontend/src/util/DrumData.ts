export interface DrumPad {
    id: number;
    name: string;
    soundUrl: string;
    volume: number;
  }

const DRUM_DATA: DrumPad[] = [
    { id: 1, name: 'Kick', soundUrl: 'https://cdn.pixabay.com/download/audio/2024/08/13/audio_b31955cb8c.mp3?filename=kick-greg-232043.mp3', volume: 0 },
    { id: 2, name: 'Snare', soundUrl: 'https://cdn.pixabay.com/download/audio/2024/09/16/audio_57c811e0c0.mp3?filename=tr808-snare-drum-241403.mp3', volume: 0 },
    { id: 3, name: 'Hi-hat', soundUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_f0f26c04e7.mp3?filename=echoed-hi-hats-89491.mp3', volume: 0 },
    { id: 4, name: 'Crash', soundUrl: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_3eb8899ab8.mp3?filename=electronic-crash-8-100412.mp3', volume: 0 },
    { id: 5, name: 'Percussion', soundUrl: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_3f94762948.mp3?filename=perc-screech-thinger-104898.mp3', volume: 0 },
]

export const STEPS = 16;
export const BPM = 120;

export default DRUM_DATA;