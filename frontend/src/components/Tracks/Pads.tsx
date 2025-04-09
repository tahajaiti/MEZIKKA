import React, { useCallback, useEffect, useMemo, useRef } from "react"
import Pad from "./Pad"
import * as Tone from "tone"
import { Volume2, VibrateOff, CircleGauge, Trash } from "lucide-react"
import useTrackStore from "../../stores/useTrackStore"

interface PadsProps {
  id: number
  name: string
  soundUrl: string
}

const Pads: React.FC<PadsProps> = ({ id, name = "Pad", soundUrl = "" }) => {
  const { isPlaying, currentStep, sequences, drums, mutedPads, togglePad, toggleMute, updateVolume, setCurrentStep, deleteDrum } =
    useTrackStore()

  const samplerRef = useRef<Tone.Sampler | null>(null)
  const sequenceRef = useRef<Tone.Sequence | null>(null)

  const currentDrum = useMemo(() => drums.find((drum) => drum.id === id), [drums, id]);
  const volume = currentDrum?.volume || 0;
  const isMuted = mutedPads.has(id);
  const activePads = useMemo(() => sequences[id] || Array(16).fill(false), [sequences, id]);

  const handleTogglePad = useCallback((step: number) => togglePad(id, step), [id, togglePad]);
  const handleToggleMute = useCallback(() => toggleMute(id), [id, toggleMute]);
  const handleDeleteDrum = useCallback(() => deleteDrum(id), [id, deleteDrum]);
  const handleUpdateVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = Number.parseFloat(e.target.value);
    updateVolume(id, newVol);
  }, [id, updateVolume]);



  // initializing the sampler
  useEffect(() => {
    samplerRef.current = new Tone.Sampler({
      urls: {
        C4: soundUrl,
      },
      onload: () => {
        console.log(`Sampler loaded`);
      },
    }).toDestination()

    if (samplerRef.current) {
      samplerRef.current.volume.value = isMuted ? Number.NEGATIVE_INFINITY : volume
    }

    return () => {
      if (samplerRef.current) {
        samplerRef.current.dispose()
        samplerRef.current = null
      }

      if (sequenceRef.current) {
        sequenceRef.current.dispose()
        sequenceRef.current = null
      }
    }
  }, [soundUrl, id])

  //updating the volume
  useEffect(() => {
    if (samplerRef.current) {
      samplerRef.current.volume.value = isMuted ? Number.NEGATIVE_INFINITY : volume
    }
  }, [volume, isMuted])

  //setting up the sequencer
  useEffect(() => {
    if (sequenceRef.current) {
      sequenceRef.current.dispose()
      sequenceRef.current = null
    }

    sequenceRef.current = new Tone.Sequence(
      (time, step) => {
        setCurrentStep(step) //set the current step globally so they are in sync

        if (activePads[step] && samplerRef.current && !isMuted) {
          samplerRef.current.triggerAttackRelease("C4", "16n", time)
        }
      },
      Array.from({ length: 16 }, (_, i) => i),
      "16n",
    )

    if (isPlaying) {
      sequenceRef.current.start(0)
    } else {
      sequenceRef.current.stop()
      setCurrentStep(0)
    }

    return () => {
      if (sequenceRef.current) {
        sequenceRef.current.dispose()
        sequenceRef.current = null
      }
    }
  }, [activePads, isPlaying, isMuted, setCurrentStep])

  return (
    <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <div className="flex items-center">
          <CircleGauge className="w-5 h-5 text-red-500 mr-2" />
          <h3 className="font-bold text-white w-24 truncate">{name}</h3>
        </div>

        <div className="flex items-center flex-1 gap-3">
          <span className="text-zinc-400 text-sm font-medium">Volume</span>
          <div className="relative flex-1 max-w-56">
            <input
              type="range"
              min="-20"
              max="5"
              step={0.5}
              value={volume}
              onChange={handleUpdateVolume}
              className="w-full h-2 appearance-none accent-red-500 bg-zinc-800 rounded outline-none"
            />
            <div
              className="absolute top-2 left-0 h-2 bg-red-500 rounded pointer-events-none"
              style={{
                width: `${((volume + 20) / 25) * 100}%`,
                opacity: isMuted ? 0.3 : 1,
              }}
            />
          </div>
          <span className="text-zinc-400 text-xs font-mono w-8">{volume.toFixed(1)}</span>

          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${isMuted ? "bg-red-500 text-white hover:bg-red-600" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            onClick={handleToggleMute}
          >
            {isMuted ? <VibrateOff size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
        <Trash size={30} className="text-red-500 cursor-pointer hover:text-red-600"
          onClick={handleDeleteDrum}
        />
      </div>

      <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5">
        {activePads.map((isActive, i) => (
          <Pad key={i} isActive={isActive} onClick={() => handleTogglePad(i)} isCurrent={currentStep === i} />
        ))}
      </div>
    </div>
  )
}

export default Pads

