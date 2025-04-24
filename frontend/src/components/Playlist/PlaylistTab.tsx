import { useEffect, useRef } from "react";
import { useInfiniteUserPlaylist } from "../../api/services/playlist/query";
import { Play } from "lucide-react";
import CompactPlaylistCard from "./CompactPlaylistCard";

interface Props {
    userId: string | number;
}

const PlaylistTab = ({ userId }: Props) => {
    const {
        data,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
    } = useInfiniteUserPlaylist(String(userId));

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
        return <div className="text-center py-8 text-red-500">Failed to get playlists</div>;
    }

    const allPlaylists = data.pages.flatMap((page) => page.data?.data || []);


    return (
        <div className="flex justify-center w-full">
            {allPlaylists.length === 0 ? (
                <div className="text-center py-8 text-zinc-400">
                    <Play className="w-12 h-12 mx-auto mb-4 text-zinc-600" />
                    <h3 className="text-lg font-medium mb-2">No created playlists yet</h3>
                    <p className="text-sm">created playlists, will appear here.</p>
                </div>
            ) : (
                <div className="w-full max-w-6xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {allPlaylists.map((playlist) => (
                            <CompactPlaylistCard playlist={playlist} key={playlist.id} />
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
};

export default PlaylistTab;

