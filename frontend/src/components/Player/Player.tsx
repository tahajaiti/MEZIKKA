import { Heart, Pause, Play, Volume2 } from "lucide-react";
import { RedSlider } from "../Inputs/Slider";
import usePlayerStore from "../../stores/usePlayerStore";
import { useGetSong } from "../../api/services/song/query";
import { useEffect, useState } from "react";
import SongData from "../../types/Song";
import { formatUrl } from "../../util/Formatters";
// import { formatTime } from '../../util/Formatters';

const Player = () => {
  const [song, setSong] = useState<SongData | null>(null);
  const { isPlaying, toggle, currentSong } = usePlayerStore();
  const { data, refetch } = useGetSong(currentSong || "");

  useEffect(() => {
    refetch();
    if (currentSong) {
      if (data && data.data) {
        setSong(data.data);
      }
    }
  }, [currentSong, data, refetch]);

  const handlePlay = () => {
    toggle();
  };

  if (!song) {
    return (
      <div className="bg-black w-full h-24 grid grid-cols-3 items-center px-4 border-t border-zinc-900 sticky bottom-0 left-0 right-0 z-50">
        <h1 className="text-lg font-bold text-white">No song selected</h1>
      </div>
    );
  }

  return (
    <div className="bg-black w-full h-24 grid grid-cols-3 items-center px-4 border-t border-zinc-900 sticky bottom-0 left-0 right-0 z-50">
      {/* Track info */}
      <div className="flex items-center gap-4">
        <img className="h-16 w-16 object-cover" src={formatUrl(song.cover_path)} alt="Track cover" />
        <div className="flex flex-col justify-center overflow-hidden">
          <h1 className="text-lg font-bold text-white truncate max-w-[10rem]">{song.name}</h1>
          <h2 className="text-sm text-gray-300 truncate max-w-[10rem]">{song.user.name}</h2>
        </div>
        <Heart className="text-white cursor-pointer hover:text-red-500 transition-all hover:fill-current ml-4" />
      </div>

      {/* Player controls */}
      <div className="flex flex-col items-center gap-2">
        {!isPlaying ? (
          <button onClick={handlePlay} className="bg-white rounded-full p-2 hover:bg-red-500 transition-colors">
            <Play className="text-black fill-current h-5 w-5" />
          </button>
        ) : (
          <button onClick={handlePlay} className="bg-white rounded-full p-2 hover:bg-red-500 transition-colors">
            <Pause className="text-black fill-current h-5 w-5" />
          </button>
        )}
        <div className="flex justify-between items-center gap-6 w-full max-w-[37rem] px-4">
          <span className="text-xs text-gray-400">1</span>
          <RedSlider size="small" defaultValue={30} />
          <span className="text-xs text-gray-400">1</span>
        </div>
      </div>

      {/* Volume control */}
      <div className="flex items-center justify-end gap-4 pr-10">
        <Volume2 className="text-white" size={24} />
        <RedSlider defaultValue={50} sx={{ width: 100 }} valueLabelDisplay="auto" />
      </div>
    </div>
  );
};

export default Player;
