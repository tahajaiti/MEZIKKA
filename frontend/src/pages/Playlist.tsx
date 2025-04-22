import { motion } from 'motion/react'
import PlaylistCard from '../components/Playlist/PlaylistCard'
import { Grid2X2Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import PlaylistCreateForm from '../components/Playlist/PlaylistCreateForm'
import { useGetPlaylists } from '../api/services/playlist/query'
import { PlaylistData } from '../types/Playlist'

const Playlist = () => {
    const [addOpen, setAddOpen] = useState(false);
    const [playlists, setPlaylists] = useState<PlaylistData[]>([]);
    const { data, isError } = useGetPlaylists();

    useEffect(() => {
        if (data && data.data) {
            setPlaylists(data.data);
        }
    }, [data]);


    if (isError) {
        return (
            <div className="w-full h-full text-center text-red-600">
                Error loading playlists, please try again later.
            </div>
        );
    }

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='h-full w-full bg-gradient-to-br from-zinc-800 to-zinc-950 p-12 overflow-y-auto
            flex flex-col items-center gap-10'>

            {addOpen && (<PlaylistCreateForm onClose={() => setAddOpen(false)} />)}

            <div className='w-full flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Manage Playlists</h1>
                <button
                    onClick={() => setAddOpen(!addOpen)}
                    className='bg-red-600 font-medium px-4 py-1 rounded-full shadow-md shadow-red-500/50 flex items-center gap-2
                cursor-pointer hover:bg-zinc-600 hover:shadow-none transition-all'>
                    <Grid2X2Plus />
                    New Playlist
                </button>
            </div>

            <div className='grid grid-cols-5 items-center gap-20'>
                {playlists.length > 0 ? (
                    playlists.map((playlist) => (
                        <PlaylistCard key={playlist.id} playlist={playlist} />
                    ))
                ) : (
                    <div className="w-full text-center text-gray-500">
                        No playlists available.
                    </div>
                )}
            </div>
        </motion.main>
    );
}

export default Playlist;
