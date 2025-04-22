import { useEffect, useState } from "react";
import SongData from "../../types/Song";
import SongCard from "../Song/SongCard";
import { useSearch } from "../../api/services/search/query";

interface Props {
    query: string;
}

const subParams = [
    { key: 'newest', name: "Newest" },
    { key: 'oldest', name: "Oldest" },
    { key: 'most_liked', name: "Most Liked" },
    { key: 'least_liked', name: "Least Liked" },
];

const SearchSongTab = ({ query }: Props) => {
    const [songs, setSongs] = useState<SongData[]>([]);
    const [sort, setSort] = useState("newest");

    const { data, isPending, isError } = useSearch(query, sort, !!query);

    useEffect(() => {
        if (data?.data) {
            setSongs(data.data);
        }
    }, [data]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
                {subParams.map((p) => (
                    <button
                        onClick={() => setSort(prev => prev !== p.key ? p.key : prev)}
                        key={p.key}
                        className={`rounded-full px-4 py-1 text-sm font-semibold cursor-pointer transition-all duration-150
                            ${sort === p.key
                                ? "bg-red-500 hover:bg-zinc-700"
                                : "bg-zinc-800 hover:bg-red-500"}
                        `}
                    >
                        {p.name}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {isPending && (
                    <p className="text-zinc-400 text-lg col-span-full">Searching...</p>
                )}

                {isError && (
                    <p className="text-red-400 text-lg col-span-full">
                        An unexpected error occurred, try again later.
                    </p>
                )}

                {!isPending && !isError && songs.length === 0 && (
                    <p className="text-zinc-500 text-lg italic col-span-full">
                        No tracks found for "{query}"
                    </p>
                )}

                {!isPending && !isError && songs.map((song) => (
                    <SongCard song={song} key={song.id} />
                ))}
            </div>
        </div>
    );
};

export default SearchSongTab;
