import { PlusIcon, Search, Shield } from "lucide-react";
import useAuthStore from "../../stores/authStore";
import { formatUrl } from "../../util/Formatters";
import MezikkaText from "../Texts/MezikkaText";
import { Link } from "react-router";
import { logout } from "../../stores/authStore";
import { useLogout } from "../../api/services/auth/query";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const { profile, user } = useAuthStore();
  const { mutate } = useLogout();
  const img = formatUrl(profile?.avatar);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 flex justify-between items-center px-4 md:px-8 lg:px-16 py-2 z-50 w-full bg-zinc-900/80 backdrop-blur-md">
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
          <PlusIcon className="w-4 h-4" />
          <span className="hidden sm:inline">New Beat</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/search"
          className="p-1 sm:p-1.5 md:p-2 hover:bg-zinc-500/40 rounded-full transition-all cursor-pointer"
          aria-label="Toggle search"
        >
          <Search className="w-6 h-6" />
        </Link>

        {isAdmin && (
          <Link
            to="/admin"
            className="p-1 sm:p-1.5 md:p-2 bg-red-800/50 hover:bg-red-700 rounded-full transition-all cursor-pointer"
            aria-label="Admin menu"
          >
            <Shield className="w-6 h-6 sm:w-5 sm:h-5" />
          </Link>
        )}

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1 sm:gap-2 py-1 px-1 cursor-pointer
                    hover:bg-zinc-500/40 rounded-full transition-all"
            aria-label="Profile menu"
          >
            <img
              src={img || "/placeholder.svg"}
              alt={`Avatar image for ${profile?.username}`}
              className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700"
            />
            <span className="text-zinc-300 text-xs sm:text-sm">{profile?.username}</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-sm shadow-lg z-50">
              <Link
                to={`/profile/${user?.id}`}
                onClick={() => setIsDropdownOpen(false)}
                className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition-all"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm cursor-pointer text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition-all"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;