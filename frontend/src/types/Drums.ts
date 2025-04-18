export interface DrumPad {
    id: number | string
    name: string
    soundUrl: string
    volume: number
    note: string
}

export interface DrumData {
    bpm: number;
    sequences: Record<string | number, boolean[]>;
    drums: DrumPad[];
    currentStep: number;
    mutedPads: (string | number)[];
}

export interface DrumSequencerState {
    isPlaying: boolean
    bpm: number
    drums: DrumPad[]
    sequences: Record<string | number, boolean[]>
    customSoundUrl: string
    customSoundName: string
    currentStep: number
    mutedPads: Set<number | string>
    saveFormOpen: boolean
    songId: string | null

    getSequences: () => Record<string | number, boolean[]>
    openCloseForm: () => void
    startStopSequencer: () => Promise<void>
    updateBpm: (newBpm: number) => void
    updateVolume: (id: number | string, newVolume: number) => void
    addCustomDrum: () => void
    setCustomSoundUrl: (url: string) => void
    setCustomSoundName: (name: string) => void
    togglePad: (padId: number | string, stepIndex: number) => void
    toggleMute: (padId: number | string) => void
    setCurrentStep: (step: number) => void
    getSongData: () => DrumData
    setSongId: (id: string) => void
    loadSong: (songData: DrumData, id: string) => void
    deleteDrum: (id: number) => void
    reset: () => void;
    clearPad: (id: number) => void;
    setPreset: (name: string) => void;
}

