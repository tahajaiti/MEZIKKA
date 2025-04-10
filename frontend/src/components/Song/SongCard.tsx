import React, { useState } from 'react'
import { Clock, Heart } from 'lucide-react';
import { IoMdPlayCircle } from "react-icons/io";
import { IoPauseCircle } from "react-icons/io5";
import SongData from '../../types/Song';
import { formatDate, formatUrl } from '../../util/Formatters';
import usePlayerStore from '../../stores/usePlayerStore';

interface songProps {
    song: SongData;
}

const SongCard = ({ song }: songProps) => {
    const [playing, setPlaying] = useState(false);
    const { load, play, pause, toggle, currentSong, isPlaying } = usePlayerStore();


    const handlePlay = async () => {
        if (currentSong === song.id) {
            toggle();
            setPlaying(!playing);
            return;
        }
        await load(song.id).then(() => {
            play();
            setPlaying(true);
        });
        return;
    }

    const handlePause = () => {
        pause();
        setPlaying(false);
    }

    const yes = playing && isPlaying ? true : false;


    return (
        <div className="w-full max-w-xs bg-zinc-900 text-white rounded-lg overflow-hidden shadow-lg border border-zinc-800">
            <div className="relative">
                <img
                    src={formatUrl(song.cover_path)}
                    alt="cover"
                    className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>

                {yes ? (
                    <button
                        onClick={handlePause}
                        className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-all">
                        <IoPauseCircle size={64} className="text-zinc-800 cursor-pointer hover:text-red-500 transition-all" />
                    </button>

                ) : (
                    <button
                        onClick={handlePlay}
                        className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-all">
                        <IoMdPlayCircle size={64} className="text-zinc-800 cursor-pointer hover:text-red-500 transition-all" />
                    </button>
                )}

                <div className="absolute top-2 right-2 bg-red-600 px-2 py-1 rounded-full text-xs font-bold">
                    {song.genre.name}
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-bold text-lg text-white truncate">{song.name}</h3>

                <p className="text-gray-400 text-sm mb-2">{song.user.name}</p>

                <p className="text-gray-300 text-xs h-8 overflow-hidden">
                    {song.description}
                </p>

                <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
                    <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{formatDate(song.created_at)}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Heart size={16} className="text-white hover:fill-current hover:text-red-500 transition-all cursor-pointer" />
                        <span>999</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SongCard