import { Plus, Music, Link2 } from 'lucide-react';
import useTrackStore from '../../stores/useTrackStore';

const CustomSoundControls = () => {
    const { customSoundName, customSoundUrl, setCustomSoundName, setCustomSoundUrl, addCustomDrum } = useTrackStore();

    const isFormValid = customSoundUrl && customSoundName;

    return (
        <div className="bg-zinc-900 p-5 rounded-xl mb-8 border border-zinc-800 shadow-lg h-full w-full flex justify-between flex-col">
            <div className="flex items-center gap-2 mb-5">
                <Music className="w-5 h-5 text-red-500" />
                <h2 className="text-lg font-bold text-white">Add a new Sound</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr,auto] gap-5">
                <div className="space-y-2">
                    <label htmlFor="custom-name" className="block text-sm font-medium text-zinc-400">
                        Sound Name
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Music className="w-4 h-4 text-zinc-500" />
                        </div>
                        <input
                            type="text"
                            id="custom-name"
                            value={customSoundName}
                            onChange={(e) => setCustomSoundName(e.target.value)}
                            className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                            placeholder="Kick, Snare, etc."
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="custom-url" className="block text-sm font-medium text-zinc-400">
                        Sound URL
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Link2 className="w-4 h-4 text-zinc-500" />
                        </div>
                        <input
                            type="url"
                            id="custom-url"
                            value={customSoundUrl}
                            onChange={(e) => setCustomSoundUrl(e.target.value)}
                            className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                            placeholder="https://example.com/sound.mp3"
                        />
                    </div>
                </div>

                <div className="flex items-end">
                    <button
                        onClick={addCustomDrum}
                        disabled={!isFormValid}
                        className={`
                            flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all
                            ${isFormValid
                                ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20'
                                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}
                        `}
                    >
                        <Plus className="w-4 h-4" />
                        Add Sound
                    </button>
                </div>
            </div>

            {!isFormValid && (
                <p className="mt-3 text-xs text-zinc-500">
                    Both name and URL are required to add a custom sound.
                </p>
            )}
        </div>
    );
};

export default CustomSoundControls;
