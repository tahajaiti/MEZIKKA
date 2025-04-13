export interface DrumPad {
  id: number;
  name: string;
  soundUrl: string;
  volume: number;
}

export interface Preset {
  name: string;
  sounds: DrumPad[];  
}

// volume is in decibles

const API_URL = 'http://localhost:8080/cdn/presets';

const trap: DrumPad[] = [
  { id: 1, name: 'Kick', soundUrl: `${API_URL}/trap/kick.wav`, volume: -10 },
  { id: 2, name: 'Snare', soundUrl: `${API_URL}/trap/snare.wav`, volume: -10 },
  { id: 3, name: 'Hi-hat', soundUrl: `${API_URL}/trap/hihat.wav`, volume: -10 },
  { id: 4, name: 'Clap', soundUrl: `${API_URL}/trap/clap.wav`, volume: -10 },
  { id: 5, name: 'Percussion', soundUrl: `${API_URL}/trap/perc.wav`, volume: -10 },
  { id: 6, name: '808', soundUrl: `${API_URL}/trap/808.wav`, volume: -10 },
]

const oldSchool: DrumPad[] = [
  { id: 1, name: 'Kick', soundUrl: `${API_URL}/old-school/kick.wav`, volume: -10 },
  { id: 2, name: 'Snare', soundUrl: `${API_URL}/old-school/snare.wav`, volume: -10 },
  { id: 3, name: 'Hi-hat', soundUrl: `${API_URL}/old-school/hihat.wav`, volume: -10 },
  { id: 4, name: 'Crash', soundUrl: `${API_URL}/old-school/crash.wav`, volume: -10 },
  { id: 5, name: 'Open-Hat', soundUrl: `${API_URL}/old-school/openhat.wav`, volume: -10 },
  { id: 6, name: 'Bass', soundUrl: `${API_URL}/old-school/bass.wav`, volume: -10 },
]



export const PRESETS: Preset[] = [
  { name: 'Trap', sounds: trap },
  { name: 'Old School', sounds: oldSchool },
];


export const STEPS = 16;
export const BPM = 120;

export default trap;