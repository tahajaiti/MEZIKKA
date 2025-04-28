import { Disc, Heart, List, User } from 'lucide-react'
import StatCard from './StatCard'
import { useGetLikeStats, useGetPlaylistStats, useGetSongStats, useGetTopGenres, useGetTopSongs, useGetUserStats } from '../../api/services/stats/query'
import { useState } from 'react';
import TopCard from './TopCard';

const Statistics = () => {
    const [userPeriod, setUserPeriod] = useState(1);
    const [songPeriod, setSongPeriod] = useState(1);
    const [playlistPeriod, setPlaylistPeriod] = useState(1);
    const [likePeriod, setLikePeriod] = useState(1);
    const { data: likeData, isPending: likePending, refetch: likeRefetch } = useGetLikeStats(likePeriod);
    const { data: userData, isPending: userPending, refetch: userRefetch } = useGetUserStats(userPeriod);
    const { data: songData, isPending: songPending, refetch: songRefetch } = useGetSongStats(songPeriod);
    const { data: playlistData, isPending: playlistPending, refetch: playlistRefetch } = useGetPlaylistStats(playlistPeriod);

    const { data: topGenresData, isPending: topGenresPending } = useGetTopGenres();
    const { data: topSongsData, isPending: topSongsPending } = useGetTopSongs();

    const handleUserStats = (period: number) => {
        setUserPeriod(period);
        userRefetch();
    }

    const handleSongStats = (period: number) => {
        setSongPeriod(period);
        songRefetch();
    }
    const handlePlaylistStats = (period: number) => {
        setPlaylistPeriod(period);
        playlistRefetch();
    }

    const handleLikeStats = (period: number) => {
        setLikePeriod(period);
        likeRefetch();
    }


    return (
        <div className='flex flex-col gap-6 px-6'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6'>
                <StatCard
                    title='Total Users'
                    value={userData?.data?.total ?? 0}
                    growth={userData?.data?.growth ?? 0}
                    isPending={userPending}
                    handler={handleUserStats}
                    setter={setUserPeriod}
                    icon={<User className="w-5 h-5" />}
                />

                <StatCard
                    title='Total Songs'
                    value={songData?.data?.total ?? 0}
                    growth={songData?.data?.growth ?? 0}
                    isPending={songPending}
                    handler={handleSongStats}
                    setter={setSongPeriod}
                    icon={<Disc className="w-5 h-5" />}
                />

                <StatCard
                    title='Likes'
                    value={likeData?.data?.total ?? 0}
                    growth={likeData?.data?.growth ?? 0}
                    isPending={likePending}
                    handler={handleLikeStats}
                    setter={setLikePeriod}
                    icon={<Heart className="w-5 h-5" />}
                />

                <StatCard
                    title='Playlists'
                    value={playlistData?.data?.total ?? 0}
                    growth={playlistData?.data?.growth ?? 0}
                    isPending={playlistPending}
                    handler={handlePlaylistStats}
                    setter={setPlaylistPeriod}
                    icon={<List className="w-5 h-5" />}
                />
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6'>
                <TopCard type='genres' data={topGenresData?.data ?? []} isLoading={topGenresPending}/>
                <TopCard type='songs' data={topSongsData?.data ?? []} isLoading={topSongsPending} />
            </div>
        </div>
    )
}

export default Statistics