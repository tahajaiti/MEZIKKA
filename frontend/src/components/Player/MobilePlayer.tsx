import { Pause, Play, X } from "lucide-react"
import type React from "react"
import { useState } from "react"
import { formatTime, formatUrl } from "../../util/Formatters"
import SongData from "../../types/Song"
import { Link } from "react-router"
import LikeBtn from "../Like/LikeBtn"

interface MobilePlayerProps {
    currentSong: SongData
    isPlaying: boolean
    setIsPlaying: (isPlaying: boolean) => void
    progress: number
    duration: number
    handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const MobilePlayer: React.FC<MobilePlayerProps> = ({
    currentSong,
    isPlaying,
    setIsPlaying,
    progress,
    duration,
    handleSeek,
}) => {
    const [expanded, setExpanded] = useState(false)

    if (!expanded) {
        return (
            <div
                className="bg-black w-full h-16 flex items-center p-2 border-t border-zinc-900 sticky bottom-0 left-0 right-0 z-50"
                onClick={() => setExpanded(true)}
            >
                <div className="flex items-center w-full">
                    <img
                        className="h-12 w-12 object-cover rounded-md mr-3"
                        src={formatUrl(currentSong.cover_path)}
                        alt={`${currentSong.name} cover`}
                    />

                    <div className="flex-1 overflow-hidden mr-3">
                        <h1 className="text-sm font-bold text-white truncate">{currentSong.name}</h1>
                        <Link to={`/profile/${currentSong.user?.id}`} className="text-xs text-gray-300 truncate">
                            {currentSong.user?.name || "Unknown Artist"}
                        </Link>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsPlaying(!isPlaying)
                        }}
                        className="bg-white rounded-full p-1.5 hover:bg-red-500 transition-colors"
                    >
                        {isPlaying ? (
                            <Pause className="text-black fill-current h-4 w-4" />
                        ) : (
                            <Play className="text-black fill-current h-4 w-4" />
                        )}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
            <div className="flex justify-between items-center p-4">
                <button onClick={() => setExpanded(false)} className="text-white p-2 cursor-pointer">
                    <X className="h-6 w-6" />
                </button>
                <h2 className="text-white text-lg font-medium">Now Playing</h2>
                <div className="w-10"></div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6 gap-8">
                <img
                    className="w-64 h-64 object-cover rounded-lg shadow-lg"
                    src={formatUrl(currentSong.cover_path) || "/placeholder.svg"}
                    alt={`${currentSong.name} cover`}
                    onError={(e) => {
                        e.currentTarget.src = "/placeholder-image.png"
                    }}
                />

                <div className="w-full text-center">
                    <h1 className="text-xl font-bold text-white mb-1">{currentSong.name}</h1>
                    <h2 className="text-base text-gray-300">{currentSong.user?.name || "Unknown Artist"}</h2>
                </div>

                <div className="w-full">
                    <input
                        type="range"
                        value={progress}
                        onChange={handleSeek}
                        max={duration || 0}
                        min={0}
                        step={0.1}
                        className="w-full accent-red-500 h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer transition-all"
                    />

                    <div className="flex justify-between mt-2">
                        <span className="text-sm text-gray-400">{formatTime(progress)}</span>
                        <span className="text-sm text-gray-400">{formatTime(duration)}</span>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-8">
                    <LikeBtn type="song" where="player" song={currentSong} />

                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-white rounded-full p-4 hover:bg-red-500 transition-colors"
                    >
                        {isPlaying ? (
                            <Pause className="text-black fill-current h-6 w-6" />
                        ) : (
                            <Play className="text-black fill-current h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MobilePlayer
