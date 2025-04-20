import { Heart } from 'lucide-react';
import { useGetLike, useToggleLike } from '../../api/services/like/query';
import { useEffect, useState } from 'react';

interface LikeButtonProps {
    type: 'playlist' | 'song';
    id: string | number;
}

const LikeButton = ({ type, id }: LikeButtonProps) => {
    const { mutate, isPending } = useToggleLike(type, id);
    const { data } = useGetLike(type, id);

    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (!data?.data) return;
        setLiked(data.data.liked_by_user);
    }, [data]);

    const handleLike = () => {
        if (isPending) return;
        mutate(undefined, {
            onSuccess: () => {
                setLiked(prev => !prev);
            }
        });
    };

    return (
        <button
            onClick={handleLike}
            className="text-white hover:text-red-500 cursor-pointer transition-all hidden md:block">
            <Heart className={`${liked ? 'fill-red-500 text-red-500 hover:text-white' : 'hover:fill-current'}`} />
        </button>
    );
};

export default LikeButton;
