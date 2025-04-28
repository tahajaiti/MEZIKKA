import React from 'react';
import { TopGenres, TopSongs } from '../../../api/services/stats/service';
import { Disc, Tag } from 'lucide-react';

interface TopCardProps {
    type: 'genres' | 'songs';
    data: TopGenres[] | TopSongs[];
    isLoading: boolean;
}

const TopCard: React.FC<TopCardProps> = ({ type, data, isLoading }) => {
    return (
        <div className='bg-zinc-900/50 backdrop-blur-xl rounded-xl p-6 border border-zinc-800 shadow-lg 
                        transition-all hover:border-zinc-700 hover:bg-zinc-900/70'>

            <h2 className="text-xl font-bold mb-5 capitalize flex items-center">
                <span className="text-red-500 mr-2">
                    {type === 'songs' ? <Disc /> : <Tag />}
                </span>
                Top 5 {type}
            </h2>

            {isLoading ? (
                <div className="flex flex-col space-y-3 animate-pulse">
                    <div className="h-34 bg-zinc-800 rounded-md w-full"></div>
                </div>
            ) : (
                <ul className="space-y-3">
                    {data.length > 0 ? (
                        data.map((item, index) => {
                            const itemName = type === 'songs' ? (item as TopSongs).name : (item as TopGenres).name;
                            const value = type === 'songs'
                                ? (item as TopSongs).likes_count
                                : (item as TopGenres).songs_count;

                            return (
                                <li
                                    key={index}
                                    className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-all"
                                >
                                    <div className="flex items-center">
                                        <span className="text-zinc-400 mr-3">{index + 1}</span>
                                        <span className="text-zinc-200 font-medium">{itemName}</span>
                                    </div>
                                    <div className="text-sm px-2 py-1 rounded-full bg-red-500 text-white">
                                        {type === 'songs' ? `${value} likes` : `${value} Songs`}
                                    </div>
                                </li>
                            );
                        })
                    ) : (
                        <li className="text-zinc-400 text-center">
                            No data available
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default TopCard;