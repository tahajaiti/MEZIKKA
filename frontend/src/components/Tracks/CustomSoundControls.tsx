import useTrackStore from '../../stores/useTrackStore';

const CustomSoundControls = () => {
    const {customSoundName, customSoundUrl, setCustomSoundName, setCustomSoundUrl, addCustomDrum} = useTrackStore();

    return (
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
    )
}

export default CustomSoundControls