import { Heart } from 'lucide-react';
import { useToggleLike } from '../../api/services/like/query';
import { useState } from 'react';
import SongData from '../../types/Song';
import  useLikeStore  from '../../stores/useLikeStore';

interface props {
    type: 'playlist' | 'song';
    where: 'player' | 'card';
    song: SongData;
}

const LikeBtn = ({ type, song, where }: props) => {
    const { mutate, isPending } = useToggleLike(type, song.id);
    const { likedSongs, toggleLike } = useLikeStore();
    const [count, setCount] = useState(song.likes_count);

    const liked = likedSongs.has(song.id);

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isPending) return;

        toggleLike(song.id); 
        setCount((prev) => (liked ? prev - 1 : prev + 1));

        mutate(undefined, {
            onError: () => {
                toggleLike(song.id);
                setCount((prev) => (liked ? prev + 1 : prev - 1));
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
                className={`${liked ? 'fill-red-500 text-red-500 hover:text-white' : 'hover:fill-current'}`}
            />
            {where === 'card' && (
                <span>{count}</span>
            )}
        </button>
    );
};

export default LikeBtn;
