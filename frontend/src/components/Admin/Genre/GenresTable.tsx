import React from 'react'
import Genre from '../../../types/Genre'
import { formatDate } from '../../../util/Formatters';

interface props {
    genres: Genre[];
}

const GenresTable = ({ genres }: props) => {
    return (
        <div className="bg-zinc-900/50 backdrop-blur-lg rounded-sm overflow-hidden shadow-lg border border-zinc-700 w-full">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-black/50">
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Created</th>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Last Updated</th>
                            <th className="py-3 px-6 text-right text-xs font-medium uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-700">
                        {genres.length > 0 ? (
                            genres.map((genre) => (
                                <tr key={genre.id} className="hover:bg-zinc-700/30 transition-colors">
                                    <td className="py-4 px-6">{genre.id}</td>
                                    <td className="py-4 px-6 font-medium">{genre.name}</td>
                                    <td className="py-4 px-6 text-zinc-400">{formatDate(genre.created_at)}</td>
                                    <td className="py-4 px-6 text-zinc-400">{formatDate(genre.updated_at)}</td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex justify-end space-x-2">
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-zinc-400">
                                    No genres found. Try a different search or add a new genre.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default GenresTable