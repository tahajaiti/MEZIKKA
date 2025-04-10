import useAuthStore from '../../stores/authStore'
import { formatUrl } from '../../util/Formatters';
import MezikkaText from '../Texts/MezikkaText';

const Header = () => {
  const { profile } = useAuthStore();

  const img = formatUrl(profile?.avatar);

  return (
    <header className='sticky top-0 py-1 flex justify-between items-center px-16 z-50'>
      <MezikkaText />
      <button
        className="flex items-center gap-2 py-1 px-2 cursor-pointer"
      >
        <img
          src={img} alt={`Avatar image for ${profile?.username}}`}
          className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700"
        />
        <span className="text-zinc-300 hidden sm:block">{profile?.username}</span>
      </button>
    </header>
  )
}

export default Header;