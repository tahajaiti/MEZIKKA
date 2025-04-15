import { UserRoundCheck } from 'lucide-react'
import { useInfiniteFollows } from '../../api/services/follow/query';
import { useEffect, useRef } from 'react';
import ProfileUserCard from '../Profile/ProfileUserCard';

interface props {
    userId: string | number;
}

const FollowTab = ({ userId }: props) => {
    const { data, isError, fetchNextPage, hasNextPage, isFetchingNextPage, isPending }
        = useInfiniteFollows(userId, 'followers');

    const loadMoreRef = useRef(null);


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        }, { threshold: 1 });

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        }
    }, [loadMoreRef, fetchNextPage, hasNextPage, isFetchingNextPage]);

    if (isPending) return (<div>LOading...</div>)
    if (isError) return (<div>Failed to get followers</div>)

    const allFollowers = data.pages.flatMap((p) => p.data?.followers.data || []);

    console.log(allFollowers);

    return (
        <div className="flex items-center gap-4">
            {allFollowers.length === 0 ? (
                <div className="text-center py-8 text-zinc-400 m-auto">
                    <UserRoundCheck className="w-12 h-12 mx-auto mb-4 text-zinc-600" />
                    <h3 className="text-lg font-medium mb-2">No followers yet</h3>
                    <p className="text-sm">When you follow users, they'll appear here.</p>
                </div>
            ) : (
                <>
                    {allFollowers.map((follower) => (
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

export default FollowTab