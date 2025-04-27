import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    useEffect(() => {
        setSearchTerm(query);
    }, [query]);

    useEffect(() => {
        const trimmed = searchTerm.trim();

        if (trimmed === "") {
            navigate("/search");
            return;
        }

        const timeout = setTimeout(() => {
            navigate(`/search?q=${encodeURIComponent(trimmed)}`);
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchTerm, navigate]);

    return (
        <div className="w-full max-w-5xl mx-auto relative">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                className="w-full flex items-center"
            >
                <div className="relative w-full">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search beats, artists, playlists..."
                        className="w-full bg-zinc-800/80 backdrop-blur-sm  rounded-md py-4 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                        autoFocus
                    />
                    <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400"
                        aria-label="Search"
                    />
                </div>
            </form>
        </div>
    );
};

export default SearchBar;