import { useEffect } from 'react';
import useLikeStore from '../../stores/useLikeStore';
import { useGetLikes } from '../../api/services/like/query';

const LikeLoader = () => {
    const { data } = useGetLikes();
    const setLikes = useLikeStore((state) => state.setLikes);

    console.log(data);

    useEffect(() => {
        if (data?.data) {
            const { songs, playlists } = data.data;
            setLikes(songs, playlists);
        }
    }, [data, setLikes]);

    return null;
};

export default LikeLoader;
