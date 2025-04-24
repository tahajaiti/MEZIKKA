import { useEffect, useRef } from "react";
import { useAddSongToPlaylist, useInfiniteUserPlaylist } from "../../api/services/playlist/query";
import useAuthStore from "../../stores/authStore";
import useModalStore from "../../stores/useModalStore"
import CompactPlaylistCard from "../Playlist/CompactPlaylistCard";
import useToastStore from "../../stores/useToastStore";



const SongContextMenu = () => {
    const { isOpen, song } = useModalStore();
    const { showToast } = useToastStore();
    const { user } = useAuthStore();

    const { data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteUserPlaylist(String(user?.id));

    const { mutate } = useAddSongToPlaylist();

    const loadMoreRef = useRef(null);


    const handleClick = (playlistId: number) => {
        if (!playlistId || !song) return;
        mutate({ playlistId: String(playlistId), songId: String(song.id) }, {
            onSuccess: () => {
                showToast("Song added to playlist", "success");
                useModalStore.setState({ isOpen: false, song: null });
            },
            onError: (error) => {
                showToast("Song already exists on playlist", "error");

                console.error("Error adding song to playlist:", error.message);
            }
        });
    }

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

    if (!isOpen || !song) return null;

    const playlists = data?.pages.flatMap((page) => page.data?.data || []);

    return (
        <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'>

            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-zinc-900 
            border border-zinc-700 rounded-sm p-6 space-y-4">

                <div className="flex items-center justify-between">
                    <h2 className="text-white text-lg">
                        Add <span className="text-zinc-300 italic">{song.name}</span> to playlist
                    </h2>
                    <button
                        type="button"
                        className="px-4 py-2 rounded bg-zinc-700 hover:bg-zinc-600 text-white"
                        onClick={() => useModalStore.setState({ isOpen: false, song: null })}
                    >
                        Cancel
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto pr-1">
                    {playlists?.map((p) => (
                        <div
                            onClick={() => handleClick(p.id)}
                            key={p.id}>
                            <CompactPlaylistCard key={p.id} playlist={p} />
                        </div>
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

        </div>
    )
}

export default SongContextMenu

