import { Heart, Play, Volume2 } from 'lucide-react'
import { RedSlider } from '../Inputs/Slider'

const PlayerSkeleton = () => {
    return (
        <div className="bg-black w-full h-24 grid grid-cols-3 items-center p-4 border-t border-zinc-900 sticky bottom-0 left-0 right-0 z-50">
            {/* Track info */}
            <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-zinc-700" />
                <div className="flex flex-col justify-center gap-2 overflow-hidden">
                    <div className="h-4 w-32 bg-zinc-700" />
                    <div className="h-3 w-24 bg-zinc-700" />
                </div>
                <Heart className="text-zinc-700 ml-4" />
            </div>

            {/* Player controls */}
            <div className="flex flex-col items-center gap-2">
                <div className="bg-zinc-700 rounded-full p-2">
                    <Play className="text-zinc-900 h-5 w-5 fill-current" />
                </div>
                <div className="flex justify-between items-center gap-6 w-full max-w-[37rem] px-4">
                    <span className="text-xs text-gray-400">0:00</span>
                    <RedSlider disabled size="small" defaultValue={0} />
                    <span className="text-xs text-gray-400">0:00</span>
                </div>
            </div>

            {/* Volume control */}
            <div className="flex items-center justify-end gap-4 pr-10">
                <Volume2 className="text-white" size={24} />
                <RedSlider disabled defaultValue={50} sx={{ width: 100 }} valueLabelDisplay="auto" />
            </div>
        </div>
    )
}

export default PlayerSkeleton