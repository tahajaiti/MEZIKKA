import { Link, useNavigate, useParams } from 'react-router'
import { motion } from 'motion/react'
import { useDeleteSong, useGetSong } from '../api/services/song/query';
import { formatDate, formatUrl } from '../util/Formatters';
import { Calendar, Clock, Music, Trash, User } from 'lucide-react';
import LikeBtn from '../components/Like/LikeBtn';
import usePlayerStore from '../stores/usePlayerStore';
import { IoPauseCircle } from 'react-icons/io5';
import { IoMdPlayCircle } from 'react-icons/io';
import useAuthStore from '../stores/authStore';
import useConfirmStore from '../stores/useConfirmStore';
import useToastStore from '../stores/useToastStore';

const Song = () => {
    const { id } = useParams();
    const { user: loggedUser } = useAuthStore();
    const { setSong, setIsPlaying, isPlaying, currentSong } = usePlayerStore();
    const { showModal } = useConfirmStore();
    const { showToast } = useToastStore();

    const navigate = useNavigate();

    const { mutate } = useDeleteSong();

    const { data } = useGetSong(id!);

    if (!data || !data.data) {
        return null;
    }

    const song = data?.data;
    const user = song?.user;

    const isOwner = loggedUser?.id === user?.id;

    const img = formatUrl(data?.data?.cover_path);
    const userImg = formatUrl(user?.profile.avatar);

    const songRelease = formatDate(song?.created_at);

    const handlePlay = () => {
        setSong(song);
        setIsPlaying(true);
    }

    const handlePause = () => {
        setIsPlaying(false);
    }

    const handleDelete = () => {
        showModal("Are you sure you want to delete this song?",
            () => {
                mutate({ id: song.id }, {
                    onSuccess: () => {
                        showToast('Song deleted successfully', 'success');
                        navigate('/', { replace: true });
                    },
                    onError: () => {
                        showToast('Error deleting song', 'error');
                    }
                });
            }
        );
    }

    const yes = isPlaying && currentSong?.id === song.id ? true : false;


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='bg-black h-full w-full border border-zinc-800 shadow-lg overflow-auto'>
            <div className="relative">
                <div className="aspect-square max-h-[500px] w-full overflow-hidden bg-zinc-700">
                    <img
                        src={img}
                        alt={song?.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                {yes ? (
                    <button
                        onClick={handlePause}
                        className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-all">
                        <IoPauseCircle size={80} className="text-white cursor-pointer hover:text-red-500 transition-all" />
                    </button>

                ) : (
                    <button
                        onClick={handlePlay}
                        className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-all">
                        <IoMdPlayCircle size={80} className="text-white cursor-pointer hover:text-red-500 transition-all" />
                    </button>
                )}

                <div className="absolute bottom-0 left-4 p-6">
                    <h1 className="text-4xl font-bold text-white mb-6">{song?.name}</h1>
                    <div className='flex items-center gap-10'>
                        <Link to={`/profile/${user?.id}`} className="flex items-center gap-4 group">
                            <div className="w-15 h-15 rounded-full overflow-hidden border-2 border-zinc-800">
                                <img
                                    src={userImg}
                                    alt={user?.profile.username}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-zinc-300 group-hover:text-white flex flex-col items-center transition-colors">
                                <span className="font-medium text-lg">{user.name}</span>
                                <span className="text-zinc-400 text-sm">@{user.profile.username}</span>
                            </div>
                        </Link>
                        <div className='scale-125'>
                            <LikeBtn type='song' where='player' song={song} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 px-10 grid gap-6 md:grid-cols-2">
                <div>
                    <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">About this beat</h2>
                    <p className="text-zinc-300 text-sm leading-relaxed">{song.description}</p>

                    <div className="mt-6 flex items-center gap-2 text-zinc-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>Released on {songRelease}</span>
                    </div>
                </div>

                <div className="bg-zinc-800/50 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Beat details</h2>
                        {isOwner && (
                            <button
                                onClick={handleDelete}
                                className="text-zinc-500 hover:text-red-500 p-1 rounded-md transition-all cursor-pointer"
                            >
                                <Trash />
                            </button>
                        )}
                    </div>

                    <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-zinc-400">
                                <Music className="w-4 h-4" />
                                <span>Genre</span>
                            </div>
                            <span className="text-white">{song?.genre.name}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-zinc-400">
                                <Clock className="w-4 h-4" />
                                <span>BPM</span>
                            </div>
                            <span className="text-white">{song?.metadata.bpm}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-zinc-400">
                                <User className="w-4 h-4" />
                                <span>Producer</span>
                            </div>
                            <span className="text-white">{user?.name}</span>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-zinc-700">
                        <h3 className="text-sm font-medium text-zinc-400 mb-2">Instruments</h3>
                        <div className="flex flex-wrap gap-2">
                            {song?.metadata.drums.map((drum, index) => (
                                <span key={index} className="px-3 py-1 bg-zinc-700 text-zinc-300 text-xs rounded-full">
                                    {drum.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Song