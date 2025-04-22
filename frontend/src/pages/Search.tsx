import { useLocation } from 'react-router';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import SearchSongTab from '../components/Search/SearchSongTab';
import SearchUserTab from '../components/Search/SearchUserTab';

const tabs = [
    { key: "beats", name: "Beats", },
    { key: "producers", name: "Producers", },
    { key: "playlists", name: "Playlists", },
];

const Search = () => {
    const [term, setTerm] = useState("");
    const [activeTab, setActiveTab] = useState("beats");

    const query = new URLSearchParams(useLocation().search).get("q");

    useEffect(() => {
        if (query) {
            setTerm(query);
        }
    }, [query]);


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

                <div className='flex overflow-x-auto mb-5'>
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-4 py-2 font-medium text-sm cursor-pointer flex items-center gap-2 transition-all whitespace-nowrap
                        ${activeTab === tab.key ? "text-red-500 border-b-2 border-red-500" : "text-zinc-400 hover:text-white"}`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>

                {activeTab === 'beats' && (
                    <SearchSongTab query={term} />
                )}

                {activeTab === 'producers' && (
                    <SearchUserTab query={term} />
                )}

            </section>
        </motion.div>
    );
};

export default Search;
