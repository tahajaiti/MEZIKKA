import { useEffect, useRef } from 'react'
import { useInfinitUserSongs } from '../../api/services/song/query';
import { Disc } from 'lucide-react';
import MiniSongCard from './MiniSongCard';

interface props {
    id: string | number;
}

const SongTab = ({ id }: props) => {
    const {
        data,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
    } = useInfinitUserSongs(id);

    const loadMoreRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            {
                rootMargin: "200px",
                threshold: 1,
            }
        );

        const currentRef = loadMoreRef.current;
        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isPending) {
        return <div className="text-center py-8">Loading...</div>;
    }

    if (isError) {
        return <div className="text-center py-8 text-red-500">Failed to get likes</div>;
    }

    const allSongs = data.pages.flatMap((page) => page.data?.data || []);


    return (
        <div className="flex justify-center w-full">
            {allSongs.length === 0 ? (
                <div className="text-center py-8 text-zinc-400">
                    <Disc className="w-12 h-12 mx-auto mb-4 text-zinc-600" />
                    <h3 className="text-lg font-medium mb-2">No created beats yet</h3>
                    <p className="text-sm">When you create beats, they'll appear here.</p>
                </div>
            ) : (
                <div className="w-full max-w-6xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {allSongs.map((song) => (
                            <MiniSongCard song={song} key={song.id} />
                        ))}
                    </div>
                    <div
                        ref={loadMoreRef}
                        className="w-full text-center py-4 text-sm text-zinc-400"
                    >
                        {isFetchingNextPage
                            ? "Loading more..."
                            : hasNextPage
                                ? "Scroll to load more"
                                : ""}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SongTab