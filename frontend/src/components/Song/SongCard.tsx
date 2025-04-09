import React from 'react'
import { Clock, Heart } from 'lucide-react';
import { IoMdPlayCircle } from "react-icons/io";


const SongCard = () => {
    return (
        <div className="w-full max-w-xs bg-zinc-900 text-white rounded-lg overflow-hidden shadow-lg border border-zinc-800">
            <div className="relative">
                <img
                    src="https://placehold.co/600x400/webp"
                    alt="cover"
                    className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-all">
                    <IoMdPlayCircle size={64} className="text-zinc-800 cursor-pointer hover:text-red-500 transition-all" />
                </div>

                <div className="absolute top-2 right-2 bg-red-600 px-2 py-1 rounded-full text-xs font-bold">
                    Electronic
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-bold text-lg text-white truncate">song title</h3>

                <p className="text-gray-400 text-sm mb-2">user</p>

                <p className="text-gray-300 text-xs h-8 overflow-hidden">
                    desc
                </p>

                <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
                    <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>date</span>
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