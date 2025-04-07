import { Calendar, Disc, User } from 'lucide-react';
import useTrackStore from '../../stores/useTrackStore';
import { useGetSong } from '../../api/services/song/query';
import { FormatDate } from '../../util/Formatters';

const apiUrl = import.meta.env.VITE_API_PUBLIC_URL;

const SongInfo = () => {
    const { songId } = useTrackStore();
    const realId = songId ? songId.split("-")[1] : '';
    const { data, isLoading, error } = useGetSong(realId);

    if (isLoading) {
        return (
            <div>Loading...</div>
        );
    }

    if (error) {
        return (
            <div className="bg-zinc-900 p-5 rounded-xl mb-8 border border-zinc-800 shadow-lg">
                <div className="text-center py-8">
                    <Disc className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-zinc-400 mb-2">Song Not Found</h3>
                    <p className="text-zinc-500">The song information could not be loaded. Please try again later.</p>
                </div>
            </div>
        );
    }

    if (!data || !data.data) {
        return;
    }

    const { name, cover_path, description, user, genre, created_at } = data.data;
    const coverUrl = apiUrl + cover_path;

    const formattedDate = created_at ? FormatDate(created_at) : "Unknown date";

    return (
        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 shadow-lg">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Cover Image */}
                <div className="w-full md:w-48 h-48 relative rounded-lg overflow-hidden border border-zinc-800 shadow-md">
                    <img
                        src={coverUrl}
                        alt={`Cover for ${name}`}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                        {genre?.name || 'Unknown Genre'}
                    </div>
                </div>

                {/* Song Details */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">{name}</h2>

                    <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-1.5 text-zinc-400">
                            <User className="w-4 h-4" />
                            <span className="text-sm">{user?.name || 'Unknown Artist'}</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-zinc-400">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{formattedDate}</span>
                        </div>

                    </div>

                    {description && (
                        <div className="mt-4">
                            <h3 className="text-sm font-medium text-zinc-400 mb-2">Description</h3>
                            <p className="text-zinc-300 text-sm bg-zinc-800/50 p-3 rounded-lg border border-zinc-700/30">
                                {description}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SongInfo;
