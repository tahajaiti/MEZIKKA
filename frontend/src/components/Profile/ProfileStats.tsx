import { useParams } from 'react-router';
import { useGetFollows } from '../../api/services/follow/query';

const ProfileStats = () => {
    const { id } = useParams();
    const { data, isError } = useGetFollows(id!);

    if (isError) {
        return (
            <div className="text-red-500">
                An error occurred while fetching followers.
            </div>
        )
    }
    if (!data || !data.data) {
        return (
            <div className="text-gray-500">
                Loading...
            </div>
        )
    }


    return (
        <div className="flex items-center gap-6 text-sm">
            <div className="flex flex-col items-center">
                <span className="text-white font-semibold">{data.data.followerCount}</span>
                <span className="text-zinc-500">Followers</span>
            </div>
            <div className="w-px h-8 bg-zinc-800"></div>
            <div className="flex flex-col items-center">
                <span className="text-white font-semibold">{data.data.followCount}</span>
                <span className="text-zinc-500">Following</span>
            </div>
            
        </div>
    )
}

export default ProfileStats