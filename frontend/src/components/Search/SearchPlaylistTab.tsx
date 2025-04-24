import { useEffect, useState } from "react";
import { usePlaylistSearch } from "../../api/services/search/query";
import { PlaylistData } from "../../types/Playlist";
import PlaylistCard from "../Playlist/PlaylistCard";

interface Props {
    query: string;
}

const subParams = [
    { key: 'newest', name: "Newest" },
    { key: 'oldest', name: "Oldest" },
    { key: 'most_liked', name: "Most Liked" },
    { key: 'least_liked', name: "Least Liked" },
];

const SearchPlaylistTab = ({ query }: Props) => {
    const [playlists, setPlaylists] = useState<PlaylistData[]>([]);
    const [sort, setSort] = useState("newest");

    const { data, isPending, isError } = usePlaylistSearch(query, sort, !!query);

    useEffect(() => {
        if (data?.data) {
            setPlaylists(data.data);
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

                {!isPending && !isError && playlists.length === 0 && (
                    <p className="text-zinc-500 text-lg italic col-span-full">
                        No playlists found for "{query}"
                    </p>
                )}

                {!isPending && !isError && playlists.map((playlist) => (
                    <PlaylistCard playlist={playlist} key={playlist.id} />
                ))}
            </div>
        </div>
    );
};

export default SearchPlaylistTab;
