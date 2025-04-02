import { useEffect, useState, useRef } from "react";
import { Pad } from "./Pad";
import { STEPS } from "../util/DrumData";
import * as Tone from 'tone';

interface PadsProps {
  key: number;
  name?: string;
  volume?: number;
  soundUrl?: string;
  isPlaying: boolean;
  onClick?: (newVol: number) => void;
}

const Pads: React.FC<PadsProps> = (
  { name = 'Pad', volume = 0, soundUrl = '', onClick, isPlaying = false }
) => {
  const [activePads, setActivePads] = useState<boolean[]>(Array(STEPS).fill(false));
  const [curStep, setCurStep] = useState(0);
  const samplerRef = useRef<Tone.Sampler | null>(null);
  const sequenceRef = useRef<Tone.Sequence | null>(null);

  const togglePad = (index: number) => {
    setActivePads((prev) =>
      prev.map((pad, i) => (i === index ? !pad : pad))
    );
  };

  useEffect(() => {
    samplerRef.current = new Tone.Sampler({
      urls: {
        C4: soundUrl,
      },
      onload: () => {
        console.log(`Sampler loaded for ${name}`);
      }
    }).toDestination();

    //initialize the volume
    if (samplerRef.current) {
      samplerRef.current.volume.value = volume;
    }

    //cleaning up
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
  }, [soundUrl, name, volume]);

  //updating the volume
  useEffect(() => {
    if (samplerRef.current) {
      samplerRef.current.volume.value = volume;
    }
  }, [volume]);

  useEffect(() => {

    // cleaning up
    if (sequenceRef.current) {
      sequenceRef.current.dispose();
      samplerRef.current = null;
    }

    sequenceRef.current = new Tone.Sequence(
      (time, step) => {
        setCurStep(step);

        if (activePads[step] && samplerRef.current) {
          samplerRef.current.triggerAttackRelease("C4", "16n", time);
        }
      },
      Array.from({ length: STEPS }, (_, i) => i),
      "16n"
    );

    if (isPlaying) {
      sequenceRef.current.start(0);
    } else {
      sequenceRef.current.stop();
      setCurStep(0);
    }

    return () => {
      if (sequenceRef.current) {
        sequenceRef.current.dispose();
        sequenceRef.current = null;
      }
    };
  }, [activePads, isPlaying]);

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <p className="font-medium w-24">{name}</p>
        <div className="flex items-center ml-4">
          <span className="mr-2 text-sm">Vol:</span>
          <input
            type="range"
            min="0"
            max="0.5"
            step={0.05}
            value={volume}
            className="w-24"
            onChange={(e) => {
              const newVolume = parseFloat(e.target.value);
              if (onClick) {
                onClick(newVolume);
              }
            }}
          />
        </div>
      </div>
      <div className="flex gap-2">
        {activePads.map((isActive, i) => (
          <Pad
            key={i}
            isActive={isActive}
            onClick={() => togglePad(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Pads;