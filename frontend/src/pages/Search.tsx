import { useLocation } from 'react-router';
import { motion } from 'motion/react';

const Search = () => {
    const query = new URLSearchParams(useLocation().search).get("q");

    return (
        <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0}}
            transition={{ duration: 0.2 }}
            className="w-full h-full pt-16 p-8 bg-gradient-to-br from-purple-950 to-zinc-950 overflow-y-auto"
        >
            {query}
        </motion.div>
    )
}

export default Search