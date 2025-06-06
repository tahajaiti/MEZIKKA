import React, { useCallback } from "react";
import Pad from "./Pad";
import { Volume2, VibrateOff, CircleGauge, Trash, CircleDashedIcon } from "lucide-react";
import useTrackStore from "../../stores/useTrackStore";

interface PadsProps {
  id: number;
  name: string;
}

const Pads: React.FC<PadsProps> = ({ id, name = "Pad" }) => {
  const {currentStep,sequences,mutedPads,togglePad,toggleMute,updateVolume,deleteDrum,clearPad,} = useTrackStore();

  const activePads = sequences[id] || Array(16).fill(false);
  const isMuted = mutedPads.has(id);
  const volume = useTrackStore(state => state.drums.find(d => d.id === id)?.volume || 0);

  const handleTogglePad = useCallback((step: number) => togglePad(id, step), [id, togglePad]);
  const handleToggleMute = useCallback(() => toggleMute(id), [id, toggleMute]);
  const handleDeleteDrum = useCallback(() => deleteDrum(id), [id, deleteDrum]);

  const handleUpdateVolume = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVol = Number.parseFloat(e.target.value);
      updateVolume(id, newVol);
    },
    [id, updateVolume]
  );
  const handleClear = useCallback(() => clearPad(id), [id, clearPad]);

  return (
    <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 shadow-lg">
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CircleGauge className="w-5 h-5 text-red-500 mr-2" />
            <h3 className="font-bold text-white w-24 truncate">{name}</h3>
          </div>
          <div className="flex gap-2 items-center">
            <button onClick={handleClear} className="p-1 rounded hover:bg-zinc-800 cursor-pointer">
              <CircleDashedIcon size={20} className="text-red-500 hover:text-red-600" />
            </button>
            <button onClick={handleDeleteDrum} className="p-1 rounded hover:bg-zinc-800 cursor-pointer">
              <Trash size={20} className="text-red-500 hover:text-red-600" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <div className="flex items-center w-full sm:w-auto sm:flex-1 min-w-0">
            <span className="text-zinc-400 text-sm font-medium mr-2 whitespace-nowrap">Volume</span>
            <div className="relative flex-1 max-w-56 min-w-0">
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
            <span className="text-zinc-400 text-xs font-mono w-8 ml-2 whitespace-nowrap">
              {volume.toFixed(1)}
            </span>
          </div>

          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${isMuted ? "bg-red-500 text-white hover:bg-red-600" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}
            onClick={handleToggleMute}
          >
            {isMuted ? <VibrateOff size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-16 gap-1 sm:gap-1.5">
        {activePads.map((isActive, i) => (
          <Pad key={i} isActive={isActive} onClick={() => handleTogglePad(i)} isCurrent={currentStep === i} />
        ))}
      </div>
    </div>
  );
};

export default Pads;