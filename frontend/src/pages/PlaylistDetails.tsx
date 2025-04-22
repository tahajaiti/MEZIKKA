import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Clock } from "lucide-react";
import { motion } from "motion/react";
import { useGetPlaylist } from "../api/services/playlist/query";
import { PlaylistData } from "../types/Playlist";
import { formatDate, formatTime, formatUrl } from "../util/Formatters";
import SongData from "../types/Song";

const PlaylistDetails = () => {
    const { id } = useParams();
    const { data, isPending, isError } = useGetPlaylist(id as string);
    const [playlist, setPlaylist] = useState<PlaylistData>();
    const [songs, setSongs] = useState<SongData[]>([]);

    useEffect(() => {
        if (data && data.data) {
            setPlaylist(data.data);
            setSongs(data.data.songs);
        }
    }, [data]);

    if (isPending || isError) {
        return <div className="w-full h-full animate-pulse bg-zinc-700"></div>
    }

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full bg-gradient-to-b from-red-950 to-zinc-950 p-4 md:p-12 overflow-y-auto flex flex-col">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 p-4 md:p-8">
                <div className="w-40 h-40 md:w-56 md:h-56 shadow-2xl flex-shrink-0">
                    <img
                        src={formatUrl(playlist?.cover)}
                        alt={playlist?.title}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="text-center md:text-left h-full flex flex-col justify-center">
                    <h2 className="text-xs font-semibold tracking-wider mb-2">PLAYLIST</h2>
                    <h1 className="text-2xl md:text-5xl font-bold mb-2">{playlist?.title}</h1>
                    <p className="text-sm text-gray-300 mb-4 max-w-2xl h">{playlist?.description}</p>
                    <div className="flex items-center text-sm justify-center md:justify-start">
                        <div className="flex items-center">
                            <Link to={`/profile/${playlist?.user?.id}`} className="font-semibold hover:text-white/70">
                                {playlist?.user?.profile?.username}
                            </Link>
                        </div>
                        <span className="mx-1">•</span>
                        <span id="likes-count">{playlist?.likes_count} likes</span>
                        <span className="mx-1">•</span>
                        <span id="song-count">{playlist?.song_count || 0} songs</span>
                    </div>
                </div>
            </div>

            <div className="h-full bg-black w-full">
                <div className="px-6 py-4">
                    <table className="w-full">
                        <thead>
                            <tr className="text-gray-400 text-left border-b border-surface text-sm">
                                <th className="pb-2 w-12">#</th>
                                <th className="pb-2">Title</th>
                                <th className="pb-2 hidden md:table-cell">Date Added</th>
                                <th className="pb-2 text-right"><Clock /></th>
                                <th className="w-10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {songs.map((song, index) => (
                                <tr className="hover:bg-surface group border-b border-surface">
                                    <td className="py-3 text-gray-400">${index + 1}</td>
                                    <td className="py-3">
                                        <div className="flex items-center">
                                            <img src={formatUrl(song.cover_path)} alt="${song.title}" className="w-10 h-10 mr-3" />
                                            <div>
                                                <div className="font-medium">${song.name}</div>
                                                <div className="text-gray-400 text-sm">${song.user.profile.username}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 text-gray-400 hidden md:table-cell">${formatDate(song.created_at)}</td>
                                    <td className="py-3 text-gray-400 text-right">${formatTime(song.metadata.bpm)}</td>
                                    <td className="py-3 text-right">
                                        <button className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                            hehehe
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.main>
    )
}

export default PlaylistDetails