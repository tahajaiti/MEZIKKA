import { useEffect, useRef } from "react";
import { useInfiniteFollows } from "../../api/services/follow/query";
import ProfileUserCard from "../Profile/ProfileUserCard";
import { UserRoundCheck, UsersRoundIcon } from "lucide-react";

interface Props {
    userId: string | number;
    type: "followers" | "follows";
}

const emptyData = {
    followers: {
        icon: <UserRoundCheck className="w-12 h-12 mb-4 text-zinc-600" />,
        title: "No followers yet",
        text: "When users follow, they'll appear here.",
    },
    follows: {
        icon: <UsersRoundIcon className="w-12 h-12 mb-4 text-zinc-600" />,
        title: "This user does not follow anyone",
        text: "Followed users will appear here.",
    },
};

const FollowTabs = ({ userId, type }: Props) => {
    const { data, isError, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, } = useInfiniteFollows(userId, type);

    const loadMoreRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            {
                rootMargin: "200px",
                threshold: 1,
            }
        );

        const currentRef = loadMoreRef.current;
        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isPending) return <div className="text-center py-8">Loading...</div>;
    if (isError) return <div className="text-center py-8 text-red-500">Failed to get {type}</div>;

    const followsList =
        data.pages.flatMap((p) => p.data?.[type]?.data || []) ?? [];

    const { icon, title, text } = emptyData[type];

    return (
        <div className="w-full flex justify-center">
            {followsList.length === 0 ? (
                <div className="text-center w-full max-w-4xl p-8 text-zinc-400 flex flex-col justify-center items-center">
                    {icon}
                    <h3 className="text-lg font-medium mb-2">{title}</h3>
                    <p className="text-sm">{text}</p>
                </div>
            ) : (
                <div className="w-full max-w-6xl px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {followsList.map((user) => (
                            <ProfileUserCard user={user} key={user.id} />
                        ))}
                    </div>
                    <div
                        ref={loadMoreRef}
                        className="w-full text-center py-4 text-sm text-zinc-400"
                    >
                        {isFetchingNextPage
                            ? "Loading more..."
                            : hasNextPage
                                ? "Scroll to load more"
                                : ""}
                    </div>
                </div>
            )}
        </div>
    )
};

export default FollowTabs;