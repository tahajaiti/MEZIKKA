import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";
import { Link } from "react-router";
import { formatTime, formatUrl } from "../../util/Formatters";
import PlayerSkeleton from "./PlayerSkeleton";
import usePlayerStore from "../../stores/usePlayerStore";
import songService from "../../api/services/song/service";
import MobilePlayer from "./MobilePlayer";
import { useMobile } from "../../util/useMobile";
import LikeBtn from "../Like/LikeBtn";

const Player = () => {
  const { isPlaying, setIsPlaying, currentSong, setVolume, volume } = usePlayerStore();
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const isMobile = useMobile();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    const loadAudio = async () => {
      if (currentSong) {
        setIsLoading(true);
        try {
          if (audioRef.current?.src) {
            URL.revokeObjectURL(audioRef.current.src);
          }

          const blob = await songService.getSongFile(currentSong.id);
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
          setProgress(0);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadAudio();

    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.error("Error playing audio:", err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, setIsPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTime = () => {
    if (audioRef.current) {
      const now = Date.now();
      if (now - lastUpdateRef.current > 100) {
        setProgress(audioRef.current.currentTime);
        lastUpdateRef.current = now;
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value);
    setProgress(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleMetadata = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number.parseFloat(e.target.value) / 100);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      setProgress(audioRef.current.duration);
    }
  };

  if (isLoading || !currentSong) {
    return <PlayerSkeleton />;
  }

  if (isMobile) {
    return (
      <>
        <MobilePlayer
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          progress={progress}
          duration={duration}
          handleSeek={handleSeek}
        />
        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={handleTime}
            onLoadedMetadata={handleMetadata}
            onLoadedData={() => {
              if (isPlaying && audioRef.current) {
                audioRef.current.play().catch((err) => {
                  console.error("Error playing audio:", err);
                  setIsPlaying(false);
                });
              }
            }}
            onEnded={handleEnded}
            preload="auto"
          />
        )}
      </>
    );
  }

  return (
    <div className="bg-black w-full h-20 md:h-24 grid grid-cols-3 items-center p-2 md:p-4 border-t border-zinc-900 sticky bottom-0 left-0 right-0 z-50">
      <div className="flex items-center gap-2 md:gap-4 col-span-1">
        <Link to={`/song/${currentSong.id}`}>
          <img
            className="h-12 w-12 md:h-16 md:w-16 object-cover"
            src={formatUrl(currentSong.cover_path) || "/placeholder.svg"}
            alt={`${currentSong.name} cover`}
          />
        </Link>
        <div className="flex flex-col justify-center overflow-hidden md:block">
          <h1 className="text-base md:text-lg font-bold text-white truncate max-w-[8rem] md:max-w-[12rem]">
            {currentSong.name}
          </h1>
          <Link
            to={`/profile/${currentSong.user?.id}`}
            className="text-xs md:text-sm cursor-pointer hover:text-gray-500 text-gray-300 truncate max-w-[8rem] md:max-w-[12rem]"
          >
            {currentSong.user?.name || "Unknown Artist"}
          </Link>
        </div>
        <LikeBtn type="song" where="player" song={currentSong} />
      </div>

      <div className="flex flex-col items-center gap-2 col-span-1 md:col-span-1">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white rounded-full p-1.5 md:p-2 hover:bg-red-500 transition-colors disabled:opacity-50"
            disabled={!currentSong || isLoading}
          >
            {isPlaying ? (
              <Pause className="text-black fill-current h-4 w-4 md:h-5 md:w-5" />
            ) : (
              <Play className="text-black fill-current h-4 w-4 md:h-5 md:w-5" />
            )}
          </button>
        </div>

        <div className="flex justify-between items-center gap-2 md:gap-4 w-full max-w-full md:max-w-[37rem] px-2 md:px-4">
          <span className="text-xs text-gray-400 min-w-[40px] text-right">{formatTime(progress)}</span>
          <div className="relative flex-1 min-w-0">
            <input
              type="range"
              value={progress}
              onChange={handleSeek}
              max={duration || 1}
              min={0}
              step={0.01}
              disabled={!currentSong || isLoading}
              className="flex-1 w-full h-2 appearance-none accent-red-500 rounded outline-none cursor-pointer transition-all duration-300"
              style={{
                background: `linear-gradient(to right, #ef4444 ${(progress / (duration || 1)) * 100}%, #27272a ${(progress / (duration || 1)) * 100}%)`,
              }}
            />
          </div>
          <span className="text-xs text-gray-400 min-w-[40px]">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-end gap-4 pr-6">
        <Volume2 className="text-white h-5 w-5" />
        <div className="relative w-24">
          <input
            type="range"
            value={volume * 100}
            onChange={handleVolume}
            max={100}
            min={0}
            step={1}
            disabled={!currentSong}
            className="w-full h-1.5 rounded-lg accent-red-500 appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #ef4444 ${volume * 100}%, #374151 ${volume * 100}%)`,
            }}
          />
        </div>
      </div>

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTime}
          onLoadedMetadata={handleMetadata}
          onLoadedData={() => {
            if (isPlaying && audioRef.current) {
              audioRef.current.play().catch((err) => {
                console.error("Error playing audio:", err);
                setIsPlaying(false);
              });
            }
          }}
          onEnded={handleEnded}
          preload="auto"
        />
      )}
    </div>
  );
};

export default Player;