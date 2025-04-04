import { useEffect, useRef } from "react";
import { Pad } from "./Pad";
import * as Tone from 'tone';
import { Volume2, VolumeOff } from "lucide-react";
import useTrackStore from "../../stores/useTrackStore";

interface PadsProps {
  id: number;
  name: string;
  soundUrl: string;
}

const Pads: React.FC<PadsProps> = ({
  id,
  name = 'Pad',
  soundUrl = '',
}) => {
  const {
    isPlaying,
    currentStep,
    sequences,
    drums,
    mutedPads,
    togglePad,
    toggleMute,
    updateVolume,
    setCurrentStep
  } = useTrackStore();

  const samplerRef = useRef<Tone.Sampler | null>(null);
  const sequenceRef = useRef<Tone.Sequence | null>(null);

  const currentDrum = drums.find(drum => drum.id === id);
  const volume = currentDrum?.volume || 0;
  const isMuted = mutedPads.has(id);
  const activePads = sequences[id] || Array(16).fill(false);

  // initializing the sampler
  useEffect(() => {
    samplerRef.current = new Tone.Sampler({
      urls: {
        C4: soundUrl,
      },
      onload: () => {
        console.log(`Sampler loaded for ${name}`);
      }
    }).toDestination();

    if (samplerRef.current) {
      samplerRef.current.volume.value = isMuted ? -Infinity : volume;
    }

    return () => {
      if (samplerRef.current) {
        samplerRef.current.dispose();
        samplerRef.current = null;
      }

      if (sequenceRef.current) {
        sequenceRef.current.dispose();
        sequenceRef.current = null;
      }
    };
  }, [soundUrl, id, name]);

  //updating the volume
  useEffect(() => {
    if (samplerRef.current) {
      samplerRef.current.volume.value = isMuted ? -Infinity : volume;
    }
  }, [volume, isMuted]);

  //setting up the sequencer
  useEffect(() => {
    if (sequenceRef.current) {
      sequenceRef.current.dispose();
      sequenceRef.current = null;
    }

    sequenceRef.current = new Tone.Sequence(
      (time, step) => {
        setCurrentStep(step); //set the current step globally so they are in sync

        if (activePads[step] && samplerRef.current && !isMuted) {
          samplerRef.current.triggerAttackRelease("C4", "16n", time);
        }
      },
      Array.from({ length: 16 }, (_, i) => i),
      "16n"
    );

    if (isPlaying) {
      sequenceRef.current.start(0);
    } else {
      sequenceRef.current.stop();
      setCurrentStep(0);
    }

    return () => {
      if (sequenceRef.current) {
        sequenceRef.current.dispose();
        sequenceRef.current = null;
      }
    };
  }, [activePads, isPlaying, isMuted, setCurrentStep]);

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <p className="font-medium w-24">{name}</p>
        <div className="flex items-center ml-4">
          <span className="mr-2 text-sm">Vol:</span>
          <input
            type="range"
            min="-20"
            max="5"
            step={0.1}
            value={volume}
            className="w-24"
            onChange={(e) => {
              const newVolume = parseFloat(e.target.value);
              updateVolume(id, newVolume);
            }}
          />
          <button
            className={`mr-4 px-2 py-1 rounded text-sm ${isMuted ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            onClick={() => toggleMute(id)}
          >
            {isMuted ? <VolumeOff /> : <Volume2 />}
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        {activePads.map((isActive, i) => (
          <Pad
            key={i}
            isActive={isActive}
            onClick={() => togglePad(id, i)}
            isCurrent={currentStep === i}
          />
        ))}
      </div>
    </div>
  );
};

export default Pads;