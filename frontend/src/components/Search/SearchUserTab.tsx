import { useEffect, useState } from "react";
import { useUserSearch } from "../../api/services/search/query";
import User from "../../types/User";
import ProfileUserCard from "../Profile/ProfileUserCard";


interface props {
    query: string;
}

const SearchUserTab = ({ query }: props) => {
    const [users, setUsers] = useState<User[]>([]);

    const { data, isPending, isError } = useUserSearch(query, !!query);

    useEffect(() => {
        if (data?.data) {
            setUsers(data.data);
        }
    }, [data]);

    if (isPending) {
        return <p className="text-zinc-400 text-lg">Searching...</p>
    }

    if (isError) {
        <p className="text-red-400 text-lg">An unexpected error occured, try again later</p>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {!isPending && !isError && users.length === 0 ? (
                <p className="text-zinc-500 text-lg italic">No producers found for "{query}"</p>
            ) : users.map((user) => (
                <ProfileUserCard user={user} key={user.id} />
            ))}
        </div>
    )
}

export default SearchUserTab


