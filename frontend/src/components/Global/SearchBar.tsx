import { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface Props {
    term: string;
    setTerm: (term: string) => void;
}

const SearchBar = ({ term, setTerm }: Props) => {
    const [inputValue, setInputValue] = useState(term);

    useEffect(() => {
        const handler = setTimeout(() => {
            setTerm(inputValue);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, setTerm]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

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
                        value={inputValue}
                        onChange={handleChange}
                        placeholder="Search beats, artists, playlists..."
                        className="w-full bg-zinc-800/80 backdrop-blur-sm rounded-md py-4 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
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
