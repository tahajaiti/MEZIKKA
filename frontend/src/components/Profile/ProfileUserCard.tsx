import { useNavigate } from 'react-router';
import User from '../../types/User'
import { formatUrl } from '../../util/Formatters';


interface props {
    user: User;
}

const ProfileUserCard = ({ user }: props) => {

    const navigate = useNavigate();

    const profile = user.profile;
    const img = formatUrl(profile.avatar);

    const handleClick = () => {
        navigate(`/profile/${user.id}`);
    }

    return (
        <button className='flex flex-col gap-2 cursor-pointer'
        onClick={handleClick}    
        >
            <div className="w-32 h-32 rounded-full bg-white m-auto border-4 border-zinc-900 overflow-hidden">
                <img
                    src={img}
                    alt={profile.username}
                    className="w-full h-full object-cover"
                />
            </div>
            <h3 className='text-center'>{profile.username}</h3>
        </button>
    )
}

export default ProfileUserCard