import React, { useState } from 'react'
import DRUM_DATA from '../util/DrumData'
import Pads from '../components/Pads'

const CreateSongPage: React.FC = () => {
  const [drums, setDrums] = useState(DRUM_DATA);
  const [customSoundUrl, setCustomSoundUrl] = useState('');
  const [customSoundName, setCustomSoundName] = useState('');

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

  return (
    <>
      {drums.map((d) => (
        <Pads key={d.id}
          name={d.name}
          volume={d.volume}
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