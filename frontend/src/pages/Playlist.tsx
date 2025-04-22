import { motion } from 'motion/react'
import PlaylistCard from '../components/Playlist/PlaylistCard'
import { Grid2X2Plus } from 'lucide-react'
import { useState } from 'react'
import PlaylistCreateForm from '../components/Playlist/PlaylistCreateForm'

const Playlist = () => {
    const [addOpen, setAddOpen] = useState(false);


    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='h-full w-full bg-gradient-to-br from-zinc-800 to-zinc-950 p-12 overflow-y-auto
            flex flex-col items-center gap-10'>


            {addOpen && (<PlaylistCreateForm onClose={() => setAddOpen(false)}/>)}

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

            <div className='grid grid-cols-4 items-center gap-20'>
                <PlaylistCard />
                <PlaylistCard />
                <PlaylistCard />
                <PlaylistCard />
            </div>


        </motion.main>
    )
}

export default Playlist