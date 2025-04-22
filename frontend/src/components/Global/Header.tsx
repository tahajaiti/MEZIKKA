import { DoorOpen, PlusIcon, Search } from "lucide-react";
import { useState } from "react";
import useAuthStore from "../../stores/authStore";
import { formatUrl } from "../../util/Formatters";
import MezikkaText from "../Texts/MezikkaText";
import { Link } from "react-router";
import { logout } from "../../stores/authStore";
import { useLogout } from "../../api/services/auth/query";
import SearchBar from "./SearchBar";

const Header = () => {
  const { profile, user } = useAuthStore();
  const { mutate } = useLogout();
  const img = formatUrl(profile?.avatar);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        logout();
      },
      onError: (error) => {
        console.error("Logout error:", error);
      },
    });
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <header className="sticky top-0 flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 py-2 z-50 w-full bg-zinc-900/80 backdrop-blur-md">
      <div className="flex gap-2 sm:gap-4 items-center">
        <MezikkaText />
        <Link
          to="/song"
          className="flex justify-center items-center gap-1.5 py-1.5 px-3
            cursor-pointer bg-red-600 hover:bg-red-700 shadow-xl shadow-red-500/20 
            rounded-full font-medium text-sm transition-colors"
          aria-label="Create new song"
        >
          <PlusIcon className="w-4 h-4" />
          <span className="hidden sm:inline">New Beat</span>
        </Link>
      </div>

      <SearchBar isVisible={isSearchVisible} toggleSearch={toggleSearch} />

      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        <button
          onClick={toggleSearch}
          className={`p-1.5 sm:p-2 hover:bg-zinc-500/40 rounded-full transition-all cursor-pointer ${isSearchVisible ? "bg-zinc-500/40" : "bg-transparent"
            }`}
          aria-label="Toggle search"
        >
          <Search className="w-5 h-5 sm:w-5 sm:h-5" />
        </button>

        <Link
          to={`/profile/${user?.id}`}
          className="flex items-center gap-2 py-1 px-2 cursor-pointer
                    hover:bg-zinc-500/40 rounded-full transition-all"
        >
          <img
            src={img || "/placeholder.svg"}
            alt={`Avatar image for ${profile?.username}`}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700"
          />
          <span className="text-zinc-300 hidden sm:block">{profile?.username}</span>
        </Link>

        <button
          onClick={handleLogout}
          className="bg-transparent p-1.5 sm:p-2 hover:bg-zinc-500/40 rounded-full transition-all cursor-pointer"
        >
          <DoorOpen className="w-5 h-5 sm:w-6 sm:h-6 shadow-xl shadow-red-500" />
        </button>
      </div>
    </header>
  );
};

export default Header;