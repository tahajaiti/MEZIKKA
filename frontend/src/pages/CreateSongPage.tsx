import React from 'react'
import Pads from '../components/Pads'
import { Pause, Play } from 'lucide-react';
import useTrackStore from '../stores/useTrackStore';

const CreateSongPage: React.FC = () => {
  const {
    isPlaying,
    bpm,
    drums,
    customSoundUrl,
    customSoundName,
    startStopSequencer,
    updateBpm,
    setCustomSoundUrl,
    setCustomSoundName,
    addCustomDrum
  } = useTrackStore();

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">Create Your Song</h1>
        <div className='mb-4'>
          <button
            onClick={startStopSequencer}
            className={`px-4 py-2 rounded-md ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="bpm" className="block mb-1">BPM: {bpm}</label>
          <input
            type="range"
            min={50}
            max={180}
            id="bpm"
            value={bpm}
            onChange={(e) => updateBpm(Number(e.target.value))}
            className="py-2 rounded bg-gray-700 text-white"
          />
        </div>
      </div>

      {drums.map((d) => (
        <Pads key={Number(d.id)}
          name={d.name}
          volume={d.volume}
          soundUrl={d.soundUrl}
          isPlaying={isPlaying}
        />
      ))}

      <div className="bg-gray-800 p-4 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Add Custom Sound</h2>
        <div className="flex flex-wrap gap-4">
          <div>
            <label htmlFor="custom-name" className="block mb-1">Sound Name</label>
            <input
              type="text"
              id="custom-name"
              value={customSoundName}
              onChange={(e) => setCustomSoundName(e.target.value)}
              className="px-3 py-2 rounded bg-gray-700 text-white w-full"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="custom-url" className="block mb-1">Sound URL</label>
            <input
              type="url"
              id="custom-url"
              value={customSoundUrl}
              onChange={(e) => setCustomSoundUrl(e.target.value)}
              className="px-3 py-2 rounded bg-gray-700 text-white w-full"
              placeholder="https://example.com/sound.mp3"
            />
          </div>
          <div className="self-end">
            <button
              onClick={addCustomDrum}
              className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 cursor-pointer"
              disabled={!customSoundUrl || !customSoundName}
            >
              Add Sound
            </button>
          </div>
        </div>
      </div>

    </>
  )
}

export default CreateSongPage