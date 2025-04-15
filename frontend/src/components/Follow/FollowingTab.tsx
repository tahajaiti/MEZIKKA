import { UsersRoundIcon } from "lucide-react";
import ProfileUserCard from "../Profile/ProfileUserCard";
import { useInfiniteFollows } from "../../api/services/follow/query";
import { useEffect, useRef } from "react";

interface props {
    userId: string | number;
}


const FollowingTab = ({ userId }: props) => {
    const { data, isError, fetchNextPage, hasNextPage, isFetchingNextPage, isPending }
        = useInfiniteFollows(userId, 'follows');

    const loadMoreRef = useRef(null);


    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            }, 
            { 
                rootMargin: '200px',
                threshold: 1 
            }
        );

        const currentRef = loadMoreRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isPending) return (<div>LOading...</div>)
    if (isError) return (<div>Failed to get followers</div>)

    const allFollows = data.pages.flatMap((p) => p.data?.follows.data || []);

    console.log(allFollows);

    return (
        <div className="flex flex-wrap gap-4 justify-start w-full max-w-6xl mx-auto px-4">
            {allFollows.length === 0 ? (
                <div className="text-center py-8 text-zinc-400 m-auto">
                    <UsersRoundIcon className="w-12 h-12 mx-auto mb-4 text-zinc-600" />
                    <h3 className="text-lg font-medium mb-2">This user does not follow anyone</h3>
                    <p className="text-sm">followed users will appear here.</p>
                </div>
            ) : (
                <>
                    {allFollows.map((follower) => (
                        <ProfileUserCard user={follower} key={follower.id} />
                    ))}
                    <div ref={loadMoreRef} className="text-center py-4 text-sm text-zinc-400">
                        {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Scroll to load more' : ''}
                    </div>
                </>
            )}
        </div>
    )
}

export default FollowingTab