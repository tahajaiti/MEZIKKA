import useAuthStore from '../../stores/authStore'
import { formatUrl } from '../../util/Formatters';

const Header = () => {
  const { profile } = useAuthStore();

  const img = formatUrl(profile?.avatar);

  return (
    <header className='sticky top-0 py-1 flex justify-end px-16 z-40'>
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