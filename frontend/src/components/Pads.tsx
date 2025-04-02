import { useEffect, useState, useRef } from "react";
import { Pad } from "./Pad";
import { STEPS } from "../util/DrumData";
import * as Tone from 'tone';

interface PadsProps {
  key: number;
  name?: string;
  volume?: number;
  soundUrl?: string;
}

const Pads: React.FC<PadsProps> = ({ name = 'Pad', volume = 0, soundUrl = ''}) => {
  const [activePads, setActivePads] = useState<boolean[]>(Array(STEPS).fill(false));
  const samplerRef = useRef<Tone.Sampler | null>(null);

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
  });

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <p className="font-medium w-24">{name}</p>
        <div className="flex items-center ml-4">
          <span className="mr-2 text-sm">Vol:</span>
          <input
            type="range"
            min="-20"
            max="10"
            value={volume}
            className="w-24"
            onChange={(e) => {
              console.log(`Volume changed for ${name}: ${e.target.value}`);
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