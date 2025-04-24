import { motion } from 'motion/react'
import { useSearchParams } from 'react-router'
import { useInfiniteGenreSongs } from '../api/services/song/query';
import { useEffect, useRef } from 'react';
import SongCard from '../components/Song/SongCard';

const Browse = () => {
    const [params] = useSearchParams();
    const genre = params.get('genre') ?? 'all';

    const {
        data,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending
    } = useInfiniteGenreSongs(genre);

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

    const songsList = data?.pages.flatMap((page) => page.data?.data || []) || [];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen w-full bg-gradient-to-br from-pink-900 to-zinc-950 overflow-x-hidden">

            <div className="pt-16 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
                <header className="py-8 md:py-12">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                        {genre === 'all' ? 'All Genres' : `${genre.charAt(0).toUpperCase() + genre.slice(1)}`}
                    </h1>
                    <p className="mt-2 text-pink-300 text-lg">
                        Browse the latest songs {genre !== 'all' ? `in ${genre}` : 'across all genres'}
                    </p>
                </header>

                {isPending ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 rounded-full border-4 border-pink-500 border-t-transparent animate-spin"></div>
                        <p className="mt-4 text-pink-200 font-medium">Loading songs...</p>
                    </div>
                ) : isError ? (
                    <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 text-center">
                        <h3 className="text-xl font-semibold text-red-300">Something went wrong</h3>
                        <p className="mt-2 text-red-200">Failed to load {genre} songs. Please try again later.</p>
                    </div>
                ) : (
                    <main>
                        {songsList.length === 0 ? (
                            <div className=" rounded-lg p-8 text-center">
                                <h3 className="text-xl font-medium text-zinc-200">No songs found</h3>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 place-items-center">
                                {songsList.map(song => (
                                    <SongCard key={song.id} song={song} />
                                ))}
                            </div>
                        )}

                        <div
                            ref={loadMoreRef}
                            className="w-full text-center py-4 text-sm text-zinc-400"
                        >
                            {isFetchingNextPage
                                ? "Loading more..."
                                : hasNextPage
                                    ? "Scroll to load more"
                                    : ""}
                            {!hasNextPage && songsList.length > 0 && (
                                <p className="text-zinc-400 text-sm">No more songs to load</p>
                            )}
                        </div>
                    </main>
                )}
            </div>
        </motion.div>
    );
};

export default Browse;