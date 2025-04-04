import React from 'react'
import Pads from '../components/Tracks/Pads'
import { Pause, Play } from 'lucide-react';
import useTrackStore from '../stores/useTrackStore';
import CustomSoundControls from '../components/Tracks/CustomSoundControls';

const CreateSongPage: React.FC = () => {
  const {
    isPlaying,
    bpm,
    drums,
    startStopSequencer,
    updateBpm,

  } = useTrackStore(); //we directly access the store here

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
        <Pads
          key={Number(d.id)}
          id={Number(d.id)}
          name={d.name}
          soundUrl={d.soundUrl}
        />
      ))}

      <CustomSoundControls />

    </>
  )
}

export default CreateSongPage