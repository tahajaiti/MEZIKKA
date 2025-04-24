import { motion } from 'motion/react'
import { useSearchParams } from 'react-router'

const Browse = () => {
    const [params] = useSearchParams();

    const genre = params.get('genre');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='w-full h-full pt-16 p-8 bg-gradient-to-br from-pink-950 to-zinc-950 overflow-y-auto'>
            Browse by {genre}
        </motion.div>
    )
}

export default Browse