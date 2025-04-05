import React, { useState } from 'react'
import Pads from '../components/Tracks/Pads'
import { Pause, Play, Save, Upload } from 'lucide-react';
import useTrackStore from '../stores/useTrackStore';
import CustomSoundControls from '../components/Tracks/CustomSoundControls';
import RecordingControls from '../components/Tracks/RecordingControls';

const CreateSongPage: React.FC = () => {
  const {
    isPlaying,
    bpm,
    drums,
    startStopSequencer,
    updateBpm,
    saveSong,
    loadSong,
  } = useTrackStore();


  const [songKey, setSongKey] = useState<string>('');

  const handleSaveSong = () => {
    const newKey = new Date().toISOString();
    saveSong(newKey);
    setSongKey(newKey);
    alert(`Song saved with key: ${newKey}`);
  };

  const handleLoadSong = () => {
    const key = prompt('Enter the song key to load:');
    if (key) {
      loadSong(key);
      setSongKey(key);
    }
  };

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
        <button
          onClick={handleSaveSong}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md flex items-center gap-2"
        >
          <Save /> Save Song
        </button>
        <button
          onClick={handleLoadSong}
          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-md flex items-center gap-2"
        >
          <Upload /> Load Song
        </button>
      </div>

      {songKey && (
        <p className="text-sm text-gray-400 mb-4">Current Song Key: {songKey}</p>
      )}

      <RecordingControls />

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