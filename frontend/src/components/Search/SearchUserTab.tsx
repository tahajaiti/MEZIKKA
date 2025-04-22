import { useEffect, useState } from "react";
import { useUserSearch } from "../../api/services/search/query";
import User from "../../types/User";
import ProfileUserCard from "../Profile/ProfileUserCard";


const subParams = [
    { key: 'newest', name: "Newest" },
    { key: 'oldest', name: "Oldest" },
    { key: 'most_followed', name: "Most Followed" },
    { key: 'least_followed', name: "Least Followed" },
];

interface props {
    query: string;
}

const SearchUserTab = ({ query }: props) => {
    const [users, setUsers] = useState<User[]>([]);
    const [sort, setSort] = useState("newest");

    const { data, isPending, isError } = useUserSearch(query, sort, !!query);

    useEffect(() => {
        if (data?.data) {
            setUsers(data.data);
        }
    }, [data]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
                {subParams.map((p) => (
                    <button
                        onClick={() => setSort(prev => prev !== p.key ? p.key : prev)}
                        key={p.key}
                        className={`rounded-full px-4 py-1 text-sm font-semibold cursor-pointer transition-all duration-150
                            ${sort === p.key
                                ? "bg-red-500 hover:bg-zinc-700"
                                : "bg-zinc-800 hover:bg-red-500"}
                        `}
                    >
                        {p.name}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
                {isPending && (
                    <p className="text-zinc-400 text-lg col-span-full">Searching...</p>
                )}

                {isError && (
                    <p className="text-red-400 text-lg col-span-full">
                        An unexpected error occurred, try again later.
                    </p>
                )}

                {!isPending && !isError && users.length === 0 && (
                    <p className="text-zinc-500 text-lg italic col-span-full">
                        No Producers found for "{query}"
                    </p>
                )}

                {!isPending && !isError && users.map((user) => (
                    <ProfileUserCard user={user} key={user.id} />
                ))}
            </div>
        </div>
    );
}

export default SearchUserTab


