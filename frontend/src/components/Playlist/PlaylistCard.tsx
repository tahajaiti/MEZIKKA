import { formatUrl } from '../../util/Formatters'
import { Heart } from 'lucide-react'

const PlaylistCard = () => {
    return (
        <div className='hover:-translate-y-2 transition-all hover:border hover:border-zinc-700 cursor-pointer
        w-full max-w-md bg-zinc-900  text-white rounded-lg overflow-hidden shadow-lg border border-zinc-800'>
            
            <div className="relative">
                <img
                    src={formatUrl()}
                    alt="cover"
                    className="w-full h-70 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            </div>
            
            <div
                className="p-4">
                <div className='flex justify-between items-center'>
                    <h3 className="font-bold text-lg text-white truncate">playlist</h3>
                    <Heart />
                </div>
                <p className="text-gray-400 text-sm mb-2">username</p>
                <p className="text-gray-300 text-xs h-8 overflow-hidden">
                    desc
                </p>
            </div>
        </div>
    )
}

export default PlaylistCard