import { useNavigate } from "react-router";
import { PlaylistData } from "../../types/Playlist"
import { formatUrl } from "../../util/Formatters";


interface props {
    playlist: PlaylistData;
}

const CompactPlaylistCard = ({ playlist }: props) => {

    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/playlist/${playlist.id}`)}
            className="flex items-center bg-zinc-900 rounded-md p-2 cursor-pointer hover:bg-zinc-800 transition-all border border-zinc-800">
            <div className="relative w-16 h-16 mr-3 flex-shrink-0">
                <img
                    src={formatUrl(playlist.cover)}
                    alt={`${playlist.title} cover`}
                    className="w-full h-full object-cover rounded"
                />

            </div>

            <h4 className="font-medium text-white text-sm truncate">{playlist.title}</h4>
        </div>
    )
}

export default CompactPlaylistCard