import { Heart } from 'lucide-react';
import { useToggleLike } from '../../api/services/like/query';
import { useEffect } from 'react';
import SongData from '../../types/Song';
import useLikeStore from '../../stores/useLikeStore';
import { PlaylistData } from '../../types/Playlist';

interface Props {
    type: 'playlist' | 'song';
    where: 'player' | 'card';
    song: SongData | PlaylistData;
}

const LikeBtn = ({ type, song, where }: Props) => {
    const { mutate, isPending } = useToggleLike(type, song.id);
    const {
        likedSongs,
        likedPlaylists,
        toggleLike,
        likeCounts,
        setLikeCount
    } = useLikeStore();

    const isLiked = type === 'song'
        ? likedSongs.has(song.id)
        : likedPlaylists.has(song.id);

    const count = likeCounts[song.id] ?? song.likes_count;

    useEffect(() => {
        setLikeCount(song.id, song.likes_count);
    }, [song.likes_count, song.id, setLikeCount]);

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isPending) return;

        toggleLike(type, song.id);
        setLikeCount(song.id, isLiked ? count - 1 : count + 1);

        mutate(undefined, {
            onError: () => {
                toggleLike(type, song.id);
                setLikeCount(song.id, isLiked ? count + 1 : count - 1);
            }
        });
    };

    return (
        <button
            onClick={handleLike}
            className="text-white hover:text-red-500 cursor-pointer transition-all flex items-center gap-2"
        >
            <Heart
                size={where === 'player' ? 24 : 16}
                className={`${isLiked ? 'fill-red-500 text-red-500 hover:text-white' : 'hover:fill-current'}`}
            />
            {where === 'card' && <span>{count}</span>}
        </button>
    );
};

export default LikeBtn;
