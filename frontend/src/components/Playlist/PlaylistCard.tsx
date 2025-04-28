import { Edit, Trash } from "lucide-react"
import useAuthStore from "../../stores/authStore"
import type { PlaylistData } from "../../types/Playlist"
import { formatUrl } from "../../util/Formatters"
import LikeBtn from "../Like/LikeBtn"
import useConfirmStore from "../../stores/useConfirmStore"
import { useDeletePlaylist } from "../../api/services/playlist/query"
import useToastStore from "../../stores/useToastStore"
import { useNavigate } from "react-router"

interface PlaylistCardProps {
    playlist: PlaylistData
    onEdit: () => void
}

const PlaylistCard = ({ playlist, onEdit }: PlaylistCardProps) => {
    const { user } = useAuthStore();
    const { showModal } = useConfirmStore();
    const { showToast } = useToastStore();
    const { mutate } = useDeletePlaylist();
    const navigate = useNavigate();

    const isOwner = user?.id === playlist.user.id;

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        showModal("Are you sure you want to delete this playlist?", () => {
            mutate(String(playlist.id), {
                onSuccess: () => {
                    showToast("Playlist deleted successfully", "success");
                }
            })
        });
    }

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit();
    }

    return (
        <div
            onClick={() => navigate(`/playlist/${playlist.id}`)}
            className="relative w-full max-w-md overflow-hidden rounded-md border border-zinc-800/50 cursor-pointer
                bg-zinc-900/90 shadow-lg transition-all duration-300 hover:-translate-y-4 hover:shadow-xl hover:border-zinc-700/90"
        >
            <div className="relative overflow-hidden">
                <img
                    src={formatUrl(playlist.cover)}
                    alt={`${playlist.title} cover`}
                    className="h-60 w-full object-cover transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent opacity-80"></div>

                {isOwner && (
                    <div className="absolute top-2 right-2 flex gap-2">
                        <button
                            onClick={handleEdit}
                            className="p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-400/90 cursor-pointer transition-all text-zinc-200 hover:text-white">
                            <Edit size={16} />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="p-2 rounded-full bg-zinc-800/80 hover:bg-red-500/90 cursor-pointer transition-all text-zinc-200 hover:text-white">
                            <Trash size={16} />
                        </button>
                    </div>
                )}
            </div>

            <div className="p-5">
                <div className="mb-3 flex items-start justify-between">
                    <div className="flex-1 pr-2">
                        <h3 className="mb-1 truncate text-lg font-bold text-white">{playlist.title}</h3>
                        <p className="text-sm text-zinc-400">by {playlist.user.profile.username}</p>
                    </div>
                    <LikeBtn song={playlist} where="card" type="playlist" />
                </div>

                <p className="mb-3 line-clamp-2 text-xs text-zinc-300">{playlist.description}</p>

                <div className="flex items-center">
                    <div className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
                        {playlist.songs_count || 0} {playlist.songs_count === 1 ? "song" : "songs"}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistCard