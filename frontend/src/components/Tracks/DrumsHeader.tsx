import useTrackStore from '../../stores/useTrackStore';
import { Music, Pause, Play, Sliders } from 'lucide-react';
import MezikkaText from '../Texts/MezikkaText';

const DrumsHeader = () => {
    const { isPlaying, bpm, drums, startStopSequencer, updateBpm } = useTrackStore();


    return (
        <header className="px-18 bg-zinc-950 fixed grid grid-cols-3 items-center gap-4 border border-zinc-800/50 rounded z-50 w-full shadow-lg">
            <MezikkaText />

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-zinc-400 text-sm font-medium">BPM:</span>
                    <span className="text-white font-mono font-bold text-lg min-w-12 text-center">{bpm}</span>
                </div>

                <div className="relative flex-1 w-40 md:w-48">
                    <input
                        type="range"
                        min={50}
                        max={180}
                        id="bpm"
                        value={bpm}
                        onChange={(e) => updateBpm(Number(e.target.value))}
                        className="w-full h-2 appearance-none accent-red-500 hover:accent-red-600 bg-zinc-800 cursor-pointer rounded outline-none"
                    />
                    <div
                        className="absolute top-2 left-0 h-2 bg-red-500 rounded pointer-events-none"
                        style={{ width: `${((bpm - 50) / 130) * 100}%` }}
                    />
                </div>

                <button
                    onClick={startStopSequencer}
                    className={`flex items-center justify-center cursor-pointer w-12 h-12 rounded-full transition-all shadow-lg
                                ${isPlaying
                            ? "bg-zinc-800 hover:bg-zinc-700 text-red-500 shadow-zinc-900/50"
                            : "bg-red-500 hover:bg-red-600 text-white shadow-red-500/30"
                        }
                                `}
                >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                <div className="bg-zinc-900/50 p-4 border-r border-l border-zinc-800/50 flex items-center gap-2 w-full">
                    <Sliders className="w-5 h-5 text-zinc-500" />
                    <p className="text-lg font-bold">{drums.length} Drum Sounds</p>
                </div>

                <div className="bg-zinc-900/50 p-4 border-l border-r border-zinc-800/50 flex items-center gap-2 w-full">
                    <Music className="w-5 h-5 text-zinc-500" />
                    <p className="text-lg font-bold">16 Steps</p>
                </div>
            </div>
        </header>
    )
}

export default DrumsHeader