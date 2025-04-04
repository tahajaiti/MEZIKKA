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
    updateBpm: (newBpm: number) => void
    updateVolume: (id: number | string, newVolume: number) => void
    addCustomDrum: () => void
    setCustomSoundUrl: (url: string) => void
    setCustomSoundName: (name: string) => void
    togglePad: (padId: number | string, stepIndex: number) => void
    toggleMute: (padId: number | string) => void
    setCurrentStep: (step: number) => void
}

