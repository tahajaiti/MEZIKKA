import { Heart, Play, Volume2 } from "lucide-react"
import { useMobile } from "../../util/useMobile"

const PlayerSkeleton = () => {
    const isMobile = useMobile()

    if (isMobile) {
        return (
            <div className="bg-black w-full h-16 flex items-center p-2 border-t border-zinc-900 sticky bottom-0 left-0 right-0 z-50">
                <div className="flex items-center w-full">
                    <div className="h-12 w-12 bg-zinc-800 rounded-md mr-3" />

                    <div className="flex-1 overflow-hidden mr-3">
                        <div className="h-3 w-32 bg-zinc-800 mb-2" />
                        <div className="h-2 w-24 bg-zinc-800" />
                    </div>

                    <div className="bg-zinc-800 rounded-full p-1.5">
                        <Play className="text-zinc-900 h-4 w-4 fill-current" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-black w-full h-20 md:h-24 grid grid-cols-1 md:grid-cols-3 items-center p-2 md:p-4 border-t border-zinc-900 sticky bottom-0 left-0 right-0 z-50">
            <div className="hidden md:flex items-center gap-4">
                <div className="h-14 w-14 md:h-16 md:w-16 bg-zinc-800 rounded-md" />
                <div className="flex flex-col justify-center gap-2 overflow-hidden">
                    <div className="h-4 w-32 bg-zinc-800" />
                    <div className="h-3 w-24 bg-zinc-800" />
                </div>
                <Heart className="text-zinc-800 ml-4" />
            </div>

            {/* Player controls */}
            <div className="flex flex-col items-center gap-2 col-span-1 md:col-span-1">
                <div className="flex items-center gap-4">
                    <div className="bg-zinc-800 rounded-full p-1.5 md:p-2">
                        <Play className="text-zinc-900 h-4 w-4 md:h-5 md:w-5 fill-current" />
                    </div>
                </div>

                <div className="flex justify-between items-center gap-2 md:gap-4 w-full max-w-full md:max-w-[37rem] px-2 md:px-4">
                    <span className="text-xs text-zinc-700 min-w-[40px] text-right">0:00</span>
                    <div className="flex-1 h-1.5 bg-zinc-800 rounded-lg" />
                    <span className="text-xs text-zinc-700 min-w-[40px]">0:00</span>
                </div>
            </div>

            <div className="hidden md:flex items-center justify-end gap-4 pr-6">
                <Volume2 className="text-zinc-800 h-5 w-5" />
                <div className="w-24 h-1.5 bg-zinc-800 rounded-lg" />
            </div>
        </div>
    )
}

export default PlayerSkeleton
