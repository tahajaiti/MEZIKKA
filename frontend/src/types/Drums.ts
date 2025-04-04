export interface DrumPad {
    id: number | string
    name: string
    soundUrl: string
    volume: number
}

export interface DrumPadSequence {
    padId: number | string
    steps: boolean[]
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


    startStopSequencer: () => Promise<void>
    
}

