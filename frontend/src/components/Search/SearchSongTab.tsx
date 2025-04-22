import { useEffect, useState } from "react";
import SongData from "../../types/Song";
import SongCard from "../Song/SongCard";
import { useSearch } from "../../api/services/search/query";


interface props {
    query: string;
}

const SearchSongTab = ({ query }: props) => {
    const [songs, setSongs] = useState<SongData[]>([]);

    const { data, isPending, isError } = useSearch(query, !!query);

    useEffect(() => {
        if (data?.data) {
            setSongs(data.data);
        }
    }, [data]);

    if (isPending) {
        return <p className="text-zinc-400 text-lg">Searching...</p>
    }

    if (isError) {
        <p className="text-red-400 text-lg">An unexpected error occured, try again later</p>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {!isPending && !isError && songs.length === 0 ? (
                <p className="text-zinc-500 text-lg italic">No tracks found for "{query}"</p>
            ) : songs.map((song) => (
                <SongCard song={song} key={song.id} />
            ))}
        </div>
    )
}

export default SearchSongTab


