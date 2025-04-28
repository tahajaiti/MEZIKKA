import React from 'react'
import { formatDate, formatUrl } from '../../../util/Formatters';
import { Trash } from 'lucide-react';
import useConfirmStore from '../../../stores/useConfirmStore';
import useToastStore from '../../../stores/useToastStore';
import SongData from '../../../types/Song';
import { useDeleteSong } from '../../../api/services/song/query';

interface props {
    songs: SongData[];
}

const SongTable = ({ songs }: props) => {
    const { showModal } = useConfirmStore();
    const { showToast } = useToastStore();
    const { mutate } = useDeleteSong();

    const handleRemove = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        showModal("Are you sure you want to remove this song?", () => {
            mutate({ id }, {
                onSuccess: () => {
                    showToast("Song removed successfully", "success");
                }
            })
        });
    }

    return (
        <div className="bg-zinc-900/50 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg border border-zinc-700 w-full">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-zinc-900/70">
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">COver</th>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Created</th>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Last Updated</th>
                            <th className="py-3 px-6 text-right text-xs font-medium uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-700">
                        {songs.length > 0 ? (
                            songs.map((song) => (
                                <tr key={song.id} className="hover:bg-zinc-700/30 transition-colors">
                                    <td className="py-4 px-6">{song.id}</td>
                                    <td className="py-4 px-6">
                                        <img
                                            className='h-15 w-16 object-cover'
                                            src={formatUrl(song.cover_path)} alt="" />
                                    </td>
                                    <td className="py-4 px-6 font-medium">{song.name}</td>
                                    <td className="py-4 px-6 text-zinc-400">{formatDate(song.created_at)}</td>
                                    <td className="py-4 px-6 text-zinc-400">{formatDate(song.updated_at)}</td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                className="text-red-500 hover:text-red-600 transition-all cursor-pointer"
                                                onClick={(e) => handleRemove(e, song.id)}
                                                title="Remove song"
                                                aria-label="Remove song"
                                            >
                                                <Trash size={18} />
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-zinc-400">
                                    No songs found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SongTable