import { useEffect, useRef } from "react";
import { useInfinitePlaylistSongs } from "../../api/services/playlist/query";
import { formatDate, formatUrl } from "../../util/Formatters";
import usePlayerStore from "../../stores/usePlayerStore";
import { useNavigate } from "react-router";
import { IoPauseCircle } from "react-icons/io5";
import { IoMdPlayCircle } from "react-icons/io";
import SongData from "../../types/Song";

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

  const { setSong, setIsPlaying, isPlaying, currentSong } = usePlayerStore();
  const navigate = useNavigate();

  const isCurrentlyPlaying = isPlaying && currentSong?.id;

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


  const handlePlay = (e: React.MouseEvent, song: SongData) => {
    e.stopPropagation();
    setSong(song);
    setIsPlaying(true);
  }

  const handlePause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(false);
  }

  const handleNavigation = (e: React.MouseEvent, songId: number) => {
    e.stopPropagation();
    navigate(`/song/${songId}`);
  }

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
          <tr
            key={song.id}
            className="border-b border-surface cursor-pointer hover:bg-white/10 transition-all"
            onClick={(e) => handleNavigation(e, song.id)}
          >
            <td className="py-3 text-gray-400 pl-3 w-10">{index + 1}</td>
            <td className="py-3">
              <div className="flex items-center">
                <div className="relative mr-3 group">
                  <img
                    src={formatUrl(song.cover_path)}
                    alt={song.name}
                    className="w-10 h-10 object-cover "
                  />
                  <button
                    onClick={(e) => isCurrentlyPlaying && currentSong?.id === song.id ? handlePause(e) : handlePlay(e, song)}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all rounded"
                  >
                    {isCurrentlyPlaying && currentSong?.id === song.id ? (
                      <IoPauseCircle size={24} className="text-white" />
                    ) : (
                      <IoMdPlayCircle size={24} className="text-white" />
                    )}
                  </button>
                </div>
                <div>
                  <div
                    className="font-medium hover:underline"
                    onClick={(e) => handleNavigation(e, song.id)}
                  >
                    {song.name}
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/user/${song.user.id}`);
                    }}
                    className="text-gray-400 text-sm hover:text-white hover:underline transition-colors"
                  >
                    {song.user.profile.username}
                  </div>
                </div>
              </div>
            </td>
            <td className="py-3 text-gray-400 hidden md:table-cell">{formatDate(song.pivot.created_at)}</td>
            <td className="py-3 text-gray-400 text-right">{song.metadata.bpm}</td>
            <td className="py-3 text-right pr-3">
              <button
                className="text-gray-400 hover:text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                More
              </button>
            </td>
          </tr>
        ))
      )}

      {!isPending && (
        <tr ref={loadMoreRef} className="w-full text-center py-4 text-sm text-zinc-400">
          <td colSpan={5} className="py-2">
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
                ? "Scroll to load more"
                : ""}
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default SongTableBody;