import { IoMdPlayCircle } from "react-icons/io"
import { IoPauseCircle } from "react-icons/io5"
import type SongData from "../../types/Song"
import { formatUrl } from "../../util/Formatters"
import usePlayerStore from "../../stores/usePlayerStore"
import { useNavigate } from "react-router"

interface MiniSongCardProps {
  song: SongData
}

const MiniSongCard = ({ song }: MiniSongCardProps) => {
  const { setSong, setIsPlaying, isPlaying, currentSong } = usePlayerStore()
  const navigate = useNavigate()
  const isCurrentlyPlaying = isPlaying && currentSong?.id === song.id

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSong(song);
    setIsPlaying(true)
  }

  const handlePause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(false)
  }

  const handleNavigation = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/song/${song.id}`)
  }

  return (
    <div
      onClick={(e) => handleNavigation(e)}
      className="flex items-center bg-zinc-900 rounded-md p-2 cursor-pointer hover:bg-zinc-800 transition-all border border-zinc-800">
      <div className="relative w-16 h-16 mr-3 flex-shrink-0">
        <img
          src={formatUrl(song.cover_path) || "/placeholder.svg"}
          alt={`${song.name} cover`}
          className="w-full h-full object-cover rounded"
        />

        <button
          onClick={isCurrentlyPlaying ? handlePause : handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-all rounded"
        >
          {isCurrentlyPlaying ? (
            <IoPauseCircle size={24} className="text-white" />
          ) : (
            <IoMdPlayCircle size={24} className="text-white" />
          )}
        </button>
      </div>

      <h4 className="font-medium text-white text-sm truncate">{song.name}</h4>
    </div>
  )
}

export default MiniSongCard
