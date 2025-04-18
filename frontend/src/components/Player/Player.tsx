import { Heart, Pause, Play, Volume2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { formatTime, formatUrl } from "../../util/Formatters";
import PlayerSkeleton from "./PlayerSkeleton";
import usePlayerStore from "../../stores/usePlayerStore";
import songService from "../../api/services/song/service";

const Player = () => {
  const { isPlaying, setIsPlaying, currentSong, setVolume, volume } = usePlayerStore();
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

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
    }

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
        audioRef.current.play().catch(err => {
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
      if (now - lastUpdateRef.current > 250) {
        setProgress(audioRef.current.currentTime);
        lastUpdateRef.current = now;
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setProgress(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleMetadata = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      console.log(audioRef.current.duration);
      setDuration(audioRef.current.duration);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value) / 100);
  };

  if (isLoading || !currentSong) {
    return <PlayerSkeleton />;
  }

  return (
    <div className="bg-black w-full h-24 grid grid-cols-3 items-center p-4 border-t border-zinc-900 sticky bottom-0 left-0 right-0 z-50">

      <div className="flex items-center gap-4">
        <img
          className="h-16 w-16 object-cover"
          src={formatUrl(currentSong.cover_path)}
          alt={`${currentSong.name} cover`}
          onError={(e) => {
            e.currentTarget.src = '/placeholder-image.png';
          }}
        />
        <div className="flex flex-col justify-center overflow-hidden">
          <h1 className="text-lg font-bold text-white truncate max-w-[10rem]">
            {currentSong.name}
          </h1>
          <h2 className="text-sm text-gray-300 truncate max-w-[10rem]">
            {currentSong.user?.name || 'Unknown Artist'}
          </h2>
        </div>
        <Heart className="text-white cursor-pointer hover:text-red-500 transition-all hover:fill-current ml-4" />
      </div>

      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-white rounded-full p-2 hover:bg-red-500 transition-colors disabled:opacity-50"
          disabled={!currentSong || isLoading}
        >
          {isPlaying ? (
            <Pause className="text-black fill-current h-5 w-5" />
          ) : (
            <Play className="text-black fill-current h-5 w-5" />
          )}
        </button>

        <div className="flex justify-between items-center gap-6 w-full max-w-[37rem] px-4">
          <span className="text-xs text-gray-400">
            {formatTime(progress)}
          </span>
          <input
            type="range"
            value={progress}
            onChange={handleSeek}
            max={duration || 0}
            min={0}
            step={0.1}
            disabled={!currentSong || isLoading}
            className="flex-1 accent-red-500 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs text-gray-400">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pr-10">
        <Volume2 className="text-white" size={24} />
        <input
          type="range"
          value={volume * 100}
          onChange={handleVolume}
          max={100}
          min={0}
          step={1}
          disabled={!currentSong}
          className="flex-1 accent-red-500 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTime}
          onLoadedMetadata={handleMetadata}
          onLoadedData={() => {
            if (isPlaying && audioRef.current) {
              audioRef.current.play().catch(err => {
                console.error("Error playing audio:", err);
                setIsPlaying(false);
              });
            }
          }}
          onEnded={() => setIsPlaying(false)}
          preload="auto"
        />
      )}
    </div>
  );
};

export default Player;