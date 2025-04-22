import { useLocation } from 'react-router';
import { motion } from 'motion/react';
import useSearch from '../api/services/search/query';
import { useEffect, useState } from 'react';
import SongData from '../types/Song';
import SongCard from '../components/Song/SongCard';

const Search = () => {
    const [term, setTerm] = useState("");
    const [songs, setSongs] = useState<SongData[]>([]);
    const query = new URLSearchParams(useLocation().search).get("q");

    const { data, isPending, isError } = useSearch(term, !!term);

    useEffect(() => {
        if (query) {
            setTerm(query);
        }
    }, [query]);

    useEffect(() => {
        if (data?.data) {
            setSongs(data.data);
        }
    }, [data]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full pt-20 px-6 sm:px-12 pb-12 bg-gradient-to-br from-purple-950 to-zinc-950 text-white overflow-y-auto"
        >
            <section className="max-w-5xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                    Searching for "{term}"
                </h2>

                {isPending && (
                    <p className="text-zinc-400 text-lg">Searching...</p>
                )}

                {isError && (
                    <p className="text-red-400 text-lg">An unexpected error occured, try again later</p>
                )}

                {!isPending && !isError && songs.length === 0 && (
                    <p className="text-zinc-500 text-lg italic">No tracks found for "{term}"</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {songs.map((song) => (
                        <SongCard song={song} key={song.id} />
                    ))}
                </div>
            </section>
        </motion.div>
    );
};

export default Search;
