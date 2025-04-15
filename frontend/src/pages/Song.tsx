import { useParams } from 'react-router'
import { useGetSong } from '../api/services/song/query';
import { formatDate, formatUrl } from '../util/Formatters';
import { Calendar, Clock, Music, User } from 'lucide-react';

const Song = () => {
    const { id } = useParams();

    const { data } = useGetSong(id!);

    if (!data || !data.data){
        return null;
    }

    const song = data?.data;
    const user = song?.user;

    const img = formatUrl(data?.data?.cover_path);
    const userImg = formatUrl(user?.profile.avatar);

    const songRelease = formatDate(song?.created_at);
    
    return (
        <div className='bg-zinc-900 rounded-xl h-full w-full border border-zinc-800 shadow-lg overflow-auto'>
            <div className="relative">
                <div className="aspect-square max-h-[500px] w-full overflow-hidden bg-zinc-800">
                    <img
                        src={img}
                        alt={song?.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h1 className="text-3xl font-bold text-white mb-2">{song?.name}</h1>
                    <a href={`/profile/${user?.id}`} className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-zinc-800">
                            <img
                                src={userImg}
                                alt={user?.profile.username}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="text-zinc-300 group-hover:text-white transition-colors">
                            <span className="font-medium">{user.name}</span>
                            <span className="text-zinc-400 text-sm ml-2">@{user.profile.username}</span>
                        </div>
                    </a>
                </div>
            </div>

            <div className="p-6 grid gap-6 md:grid-cols-2">
                <div>
                    <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">About this beat</h2>
                    <p className="text-zinc-300 text-sm leading-relaxed">{song.description}</p>

                    <div className="mt-6 flex items-center gap-2 text-zinc-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>Released on {songRelease}</span>
                    </div>
                </div>

                <div className="bg-zinc-800/50 rounded-xl p-5">
                    <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Beat details</h2>

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
        </div>
    )
}

export default Song