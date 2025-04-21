import React from 'react'
import { Clock } from 'lucide-react';
import { IoMdPlayCircle } from "react-icons/io";
import { IoPauseCircle } from "react-icons/io5";
import SongData from '../../types/Song';
import { formatDate, formatUrl } from '../../util/Formatters';
import usePlayerStore from '../../stores/usePlayerStore';
import { useNavigate } from 'react-router';
import LikeBtn from '../Like/LikeBtn';

interface songProps {
    song: SongData;
}

const SongCard = ({ song }: songProps) => {
    const { setSong, setIsPlaying, isPlaying, currentSong } = usePlayerStore();

    const navigation = useNavigate();

    const handlePlay = async () => {
        setSong(song);
        setIsPlaying(true);
    }

    const handlePause = () => {
        setIsPlaying(false);
    }

    const handleNav = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigation(`/song/${song.id}`)
    }

    const yes = isPlaying && currentSong?.id === song.id ? true : false;


    return (
        <div 
        className=" hover:-translate-y-2 transition-all hover:border hover:border-zinc-700
        w-full max-w-xs bg-zinc-900  text-white rounded-lg overflow-hidden shadow-lg border border-zinc-800">
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

            <div 
            onClick={(e) => handleNav(e)}
            className="p-4 cursor-pointer">
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
                        <LikeBtn type="song" song={song} where='card' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SongCard