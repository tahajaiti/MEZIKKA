import { Calendar, Edit, User } from "lucide-react"
import { formatDate, formatUrl } from "../../util/Formatters"
import useAuthStore from "../../stores/authStore"

const ProfileCard: React.FC = () => {

    const { profile, user } = useAuthStore();

    if (!profile || !user) {
        return null;
    }

    const memberSince = formatDate(profile.created_at);
    const img = formatUrl(profile.avatar);


    return (
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg overflow-hidden p-4">
            <div className="w-32 h-32 rounded-full bg-white m-auto border-4 border-zinc-900 overflow-hidden">
                <img
                    src={img}
                    alt={profile.username}
                    className="w-full h-full object-cover"
                />
            </div>


            <div className="p-4 flex flex-col items-center gap-6">
                <div className="flex flex-col ">
                    <h1 className="text-xl font-bold text-white text-center">{user.name}</h1>
                    <h2 className="text-md text-zinc-400 text-center">@{profile.username}</h2>
                    <div className="flex items-center gap-2 text-zinc-400 text-sm mt-1">
                        <Calendar className="w-4 h-4" />
                        <span>{memberSince}</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <User className="w-4 h-4 text-zinc-400" />
                        <span className="text-zinc-400 text-sm">{100} Followers</span>
                    </div>
                    <div className="flex gap-2">
                        <User className="w-4 h-4 text-zinc-400" />
                        <span className="text-zinc-400 text-sm">{238832} Followings</span>
                    </div>
                </div>

                <button className="px-6 py-2 w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white rounded-lg transition-all">
                    Follow
                </button>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-white mb-2">About</h2>
                    <p className="text-zinc-300">{profile.bio ?? 'No bio.'}</p>
                </div>

                <div className="bg-zinc-800/50 p-3 rounded-lg text-center w-full">
                    <div className="text-2xl font-bold text-white">42</div>
                    <div className="text-xs text-zinc-400">Beats</div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard
