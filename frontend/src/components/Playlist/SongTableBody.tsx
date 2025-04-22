import { useEffect, useRef } from "react";
import { useInfinitePlaylistSongs } from "../../api/services/playlist/query";
import { formatDate, formatUrl } from "../../util/Formatters";

interface Props {
  pId: number;
}

const SongTableBody = ({ pId }: Props) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isLoading
  } = useInfinitePlaylistSongs(String(pId));

  const loadMoreRef = useRef<HTMLTableRowElement | null>(null);

  const songs = data?.pages.flatMap((page) => page.data?.data || []) || [];

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
    return null;
  }

  return (
    <tbody>
      {isLoading ? (
        <tr>
          <td colSpan={5} className="py-4 text-center text-gray-400">
            Loading songs...
          </td>
        </tr>
      ) : (
        songs.map((song, index) => (
          <tr key={song.id} className="hover:bg-surface border-b border-surface">
            <td className="py-3 text-gray-400">{index + 1}</td>
            <td className="py-3">
              <div className="flex items-center">
                <img
                  src={formatUrl(song.cover_path)}
                  alt={song.name}
                  className="w-10 h-10 mr-3"
                />
                <div>
                  <div className="font-medium">{song.name}</div>
                  <div className="text-gray-400 text-sm">{song.user.profile.username}</div>
                </div>
              </div>
            </td>
            <td className="py-3 text-gray-400 hidden md:table-cell">{formatDate(song.created_at)}</td>
            <td className="py-3 text-gray-400 text-right">{song.metadata.bpm}</td>
            <td className="py-3 text-right">
              <button className="text-gray-400 hover:text-white">
                hehehe
              </button>
            </td>
          </tr>
        ))
      )}

      <tr ref={loadMoreRef} className="w-full text-center py-4 text-sm text-zinc-400">
        <td colSpan={5}>
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
              ? "Scroll to load more"
              : ""}
        </td>
      </tr>
    </tbody>
  );
};

export default SongTableBody;
