import { Calendar, Edit, UserMinus, UserPlus } from "lucide-react"
import { formatDate, formatUrl } from "../../util/Formatters"
import { useParams } from "react-router";
import { useGetUser } from "../../api/services/user/query";
import ProfileSkeleton from "./ProfileSkeleton";
import useToastStore from "../../stores/useToastStore";
import { useEffect, useState } from "react";
import useAuthStore from "../../stores/authStore";
import ProfileEdit from "./ProfileEdit";
import ProfileStats from "./ProfileStats";
import { useToggleFollow } from "../../api/services/follow/query";

const ProfileCard: React.FC = () => {

    const { id } = useParams();
    const { user: currentUser } = useAuthStore();
    const { data, isPending, isError } = useGetUser(id!);
    const { showToast } = useToastStore();
    
    const [editMode, setEditMode] = useState(false);
    const [isFollowing, setIsFollowing] = useState<boolean>(false)
    
    const followMutation = useToggleFollow(isFollowing);

    useEffect(() => {
        if (isError) {
            showToast('An error occured, please try again later', 'error');
        }
    }, [isError, showToast]);

    useEffect(() => {
        if (data?.data) {
            setIsFollowing(data.data.is_following)
        }
    }, [data])

    if (!data?.data || isPending) return <ProfileSkeleton />

    const profile = data.data.user.profile;
    const user = data.data.user;

    const memberSince = formatDate(profile.created_at);
    const img = formatUrl(profile.avatar);

    const isMe = user.id === currentUser?.id;

    const handleFollow = async () => {
        followMutation.mutate(profile.id, {
            onSuccess: () => {
                setIsFollowing(!isFollowing);
                showToast(isFollowing ? 'Unfollowed' : 'Followed', 'success');
            }
        })
    }

    return (
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg overflow-hidden p-4">
            {editMode ? (
                <ProfileEdit profile={profile} close={() => setEditMode(false)} />
            ) : (
                <div>
                    <div className="w-32 h-32 rounded-full bg-white m-auto border-4 border-zinc-900 overflow-hidden">
                        <img
                            src={img}
                            alt={profile.username}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="p-6 flex flex-col items-center gap-5">
                        <div className="flex flex-col items-center">
                            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                            <h2 className="text-md text-zinc-400">@{profile.username}</h2>
                            <div className="flex items-center gap-2 text-zinc-500 text-sm mt-2">
                                <Calendar className="w-4 h-4" />
                                <span>Joined {memberSince}</span>
                            </div>
                        </div>

                        <ProfileStats />

                        {isMe ? (
                            <button
                                onClick={() => setEditMode(true)}
                                className="flex items-center justify-center gap-2 px-6 py-2.5 w-full bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-all font-medium"
                            >
                                <Edit className="w-4 h-4" />
                                Edit Profile
                            </button>
                        ) : isFollowing ? (
                            <button
                                onClick={handleFollow}
                                className="flex items-center justify-center gap-2 px-6 py-2.5 w-full bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg transition-all font-medium">
                                <UserMinus className="w-4 h-4" />
                                Unfollow
                            </button>
                        ) : (
                            <button
                                onClick={handleFollow}
                                className="flex items-center justify-center gap-2 px-6 py-2.5 w-full bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all font-medium">
                                <UserPlus className="w-4 h-4" />
                                Follow
                            </button>
                        )}

                        {profile.bio && (
                            <div className="w-full mt-2">
                                <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">About</h2>
                                <p className="text-zinc-300 text-sm leading-relaxed">{profile.bio}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileCard
