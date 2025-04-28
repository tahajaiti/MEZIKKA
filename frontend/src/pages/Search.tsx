import { useSearchParams } from 'react-router';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import SearchSongTab from '../components/Search/SearchSongTab';
import SearchUserTab from '../components/Search/SearchUserTab';
import SearchPlaylistTab from '../components/Search/SearchPlaylistTab';
import SearchBar from '../components/Global/SearchBar';

const tabs = [
    { key: "beats", name: "Beats" },
    { key: "producers", name: "Producers" },
    { key: "playlists", name: "Playlists" },
];

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [term, setTerm] = useState("");

    const query = searchParams.get("q") || "";
    const tab = searchParams.get("tab") || "beats";

    useEffect(() => {
        setTerm(query);
    }, [query]);

    const handleTabChange = (key: string) => {
        const updatedParams = new URLSearchParams(searchParams.toString());
        updatedParams.set("tab", key);
        setSearchParams(updatedParams);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full pt-10 px-6 sm:px-12 pb-12 bg-gradient-to-br from-purple-950 to-zinc-950 
            text-white overflow-y-auto flex flex-col gap-10"
        >
            <SearchBar term={term} setTerm={(term: string) => setTerm(term)}/>

            <section className="max-w-5xl mx-auto w-full">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                    Searching for "{term || "..." }"
                </h2>

                <div className="flex overflow-x-auto mb-5">
                    {tabs.map(t => (
                        <button
                            key={t.key}
                            onClick={() => handleTabChange(t.key)}
                            className={`px-4 py-2 font-medium text-sm cursor-pointer flex items-center gap-2 transition-all whitespace-nowrap
                            ${tab === t.key ? "text-red-500 border-b-2 border-red-500" : "text-zinc-400 hover:text-white"}`}
                        >
                            {t.name}
                        </button>
                    ))}
                </div>

                {tab === "beats" && <SearchSongTab query={term} />}
                {tab === "producers" && <SearchUserTab query={term} />}
                {tab === "playlists" && <SearchPlaylistTab query={term} />}
            </section>
        </motion.div>
    );
};

export default Search;
