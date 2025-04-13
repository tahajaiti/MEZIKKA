import React from 'react'
import { PRESETS } from '../../util/DrumData'
import useTrackStore from '../../stores/useTrackStore';


const PresetSelector = () => {
  const { setPreset } = useTrackStore();

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value;
    setPreset(name);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-left w-full mb-4 text-zinc-400">Preset</h2>

      <select name="preset" id="preset"
        className='w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500'
        onChange={handlePresetChange}>
        {PRESETS.map((preset, index) => (
          <option key={index} value={preset.name}>
            {preset.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default PresetSelector