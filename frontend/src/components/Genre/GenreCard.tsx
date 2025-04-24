import Genre from '../../types/Genre';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useGetGenreImg } from '../../api/services/genre/query';

interface props {
    genre: Genre;
}

const GenreCard = ({ genre }: props) => {
    const navigate = useNavigate();
    const { data, isLoading } = useGetGenreImg(genre.name);
    const [imgLoaded, setImgLoaded] = useState(false);

    const handleImageLoad = () => {
        setImgLoaded(true);
    };

    return (
        <div
            onClick={() => navigate(`/browse?genre=${genre.name}`)}
            className="rounded-xl overflow-hidden shadow-md hover:-translate-y-4 
                transition-all cursor-pointer hover:bg-zinc-600/50 
                backdrop-blur-lg group"
        >
            <div className="w-full h-40 relative bg-zinc-800">
                {(!imgLoaded || isLoading) && (
                    <div className="absolute inset-0 animate-pulse bg-zinc-700/50 z-10"></div>
                )}

                {data?.data && (
                    <img
                        src={data.data}
                        alt={genre.name}
                        className={`w-full h-40 object-cover group-hover:object-bottom transition-all 
                                    duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={handleImageLoad}
                    />
                )}
            </div>

            <div className="p-4 text-center font-bold text-lg">
                {genre.name}
            </div>
        </div>
    );
};

export default GenreCard;
