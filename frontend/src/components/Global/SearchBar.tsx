import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

interface props {
    isVisible: boolean;
    toggleSearch: () => void;
}

const SearchBar = ({ isVisible, toggleSearch }: props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isVisible) {
                toggleSearch();
            }
        };

        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [isVisible, toggleSearch]);

    useEffect(() => {
        const trimmed = searchTerm.trim();

        if (trimmed === "") {
            return;
        };

        const timeout = setTimeout(() => {
            navigate(`/search?q=${encodeURIComponent(trimmed)}`);
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchTerm]);

    return (
        <div
            className={`absolute left-1/2 transform translate-y-16 -translate-x-1/2 transition-all duration-300 ${isVisible ? "w-full sm:w-1/2 md:w-1/3 opacity-100" : "w-0 opacity-0"
                }`}
        >
            {isVisible && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setSearchTerm("");
                        toggleSearch();
                    }}
                    className="w-full flex items-center"
                >
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search beats, artists..."
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-full py-1.5 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="absolute right-3 text-zinc-400 hover:text-white"
                        aria-label="Search"
                    >
                        <Search className="w-4 h-4" />
                    </button>
                </form>
            )}
        </div>
    );
};

export default SearchBar;
