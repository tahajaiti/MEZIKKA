import React, { useState, useEffect } from 'react'
import DRUM_DATA from '../util/DrumData'
import Pads from '../components/Pads'
import * as Tone from "tone";

const CreateSongPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [drums, setDrums] = useState(DRUM_DATA);
  const [bpm, setBpm] = useState(120);
  const [customSoundUrl, setCustomSoundUrl] = useState('');
  const [customSoundName, setCustomSoundName] = useState('');

  const startSequencer = async () => {
    await Tone.start(); // starts the audio context
    Tone.getTransport().bpm.value = bpm; // set the BPM

    if (isPlaying) {
      Tone.getTransport().stop();
    } else {
      Tone.getTransport().start();
    }

    setIsPlaying(!isPlaying);
  }

  const updateVolume = (id: number | string, newVolume: number) => {
    setDrums(pads => 
      pads.map(pad => 
        pad.id === id ? { ...pad, volume: newVolume } : pad
      )
    );
  };

  const addCustomDrum = () => {
    if (customSoundUrl && customSoundName) {
      const newSound = {
        id: Date.now(),
        name: customSoundName,
        soundUrl: customSoundUrl,
        volume: 0.5,
      };
      setDrums(prevDrums => [...prevDrums, newSound]);
      setCustomSoundUrl('');
      setCustomSoundName('');
    }
  }

  useEffect(() => { //change the bpm when the slider is moved
    Tone.getTransport().bpm.value = bpm;
  }, [bpm]);

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">Create Your Song</h1>
        <div className='mb-4'>
          <button
            onClick={startSequencer}
            className={`px-4 py-2 rounded-md ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
          >
            {isPlaying ? 'Stop' : 'Play'}
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
            onChange={(e) => setBpm(Number(e.target.value))}
            className="py-2 rounded bg-gray-700 text-white"
          />
        </div>
      </div>

      {drums.map((d) => (
        <Pads key={d.id}
          name={d.name}
          volume={d.volume}
          soundUrl={d.soundUrl}
          onClick={(newVolume) => updateVolume(d.id, newVolume)}
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