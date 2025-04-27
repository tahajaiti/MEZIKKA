import { DoorOpen, PlusIcon, Search, Shield } from "lucide-react";
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

  const isAdmin = user?.role.name === "admin";

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
    <header className="sticky top-0 flex justify-between items-center px-3 sm:px-4 md:px-8 lg:px-16 py-2 z-50 w-full bg-zinc-900/80 backdrop-blur-md">
      <div className="flex gap-1 sm:gap-2 md:gap-4 items-center">
        <div className="w-auto">
          <MezikkaText />
        </div>
        <Link
          to="/song"
          className="flex justify-center items-center gap-1 py-1 px-2 sm:py-1.5 sm:px-3
            cursor-pointer bg-red-600 hover:bg-red-700 shadow-xl shadow-red-500/20 
            rounded-full font-medium text-xs md:text-sm transition-colors"
          aria-label="Create new song"
        >
          <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">New Beat</span>
        </Link>
      </div>

      <div className={`absolute left-0 right-0 mx-auto w-full max-w-md px-4 transition-all duration-300 ${
        isSearchVisible ? "top-16 opacity-100" : "-top-20 opacity-0 pointer-events-none"
      } md:static md:opacity-100 md:pointer-events-auto md:w-1/3 md:max-w-xs lg:max-w-sm xl:max-w-md md:px-0`}>
        <SearchBar isVisible={isSearchVisible} toggleSearch={toggleSearch} />
      </div>

      <div className="flex items-center gap-1 xs:gap-2 sm:gap-3 md:gap-4">
        <button
          onClick={toggleSearch}
          className={`p-1 sm:p-1.5 md:p-2 hover:bg-zinc-500/40 rounded-full transition-all cursor-pointer md:hidden ${
            isSearchVisible ? "bg-zinc-500/40" : "bg-transparent"
          }`}
          aria-label="Toggle search"
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {isAdmin && (
          <Link 
            to="/admin"
            className="p-1 sm:p-1.5 md:p-2 bg-red-800/50 hover:bg-red-700 rounded-full transition-all cursor-pointer"
            aria-label="Admin menu"
          >
            <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        )}

        <Link
          to={`/profile/${user?.id}`}
          className="flex items-center gap-1 sm:gap-2 py-1 px-1 sm:px-2 cursor-pointer
                    hover:bg-zinc-500/40 rounded-full transition-all"
        >
          <img
            src={img || "/placeholder.svg"}
            alt={`Avatar image for ${profile?.username}`}
            className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700"
          />
          <span className="text-zinc-300 text-xs sm:text-sm hidden xs:block">{profile?.username}</span>
        </Link>

        <button
          onClick={handleLogout}
          className="bg-transparent p-1 sm:p-1.5 md:p-2 hover:bg-zinc-500/40 rounded-full transition-all cursor-pointer"
          aria-label="Logout"
        >
          <DoorOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 shadow-xl shadow-red-500" />
        </button>
      </div>
    </header>
  );
};

export default Header;