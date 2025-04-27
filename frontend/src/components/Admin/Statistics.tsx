import { Disc, List, Tag, User } from 'lucide-react'
import StatCard from './StatCard'
import { useGetStats } from '../../api/services/stats/query'

const Statistics = () => {
    const { data, isPending } = useGetStats();


    if (isPending || !data?.data) {
        return (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                <StatCard
                    title='Total Users'
                    value='Loading...'
                    icon={<User />} />
                <StatCard
                    title='Total Songs'
                    value='Loading...'
                    icon={<Disc />} />
                <StatCard
                    title='Total Playlists'
                    value='Loading...'
                    icon={<List />} />
                <StatCard
                    title='Total Genres'
                    value='Loading...'
                    icon={<Tag />} />
            </div>
        )
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <StatCard
                title='Total Users'
                value={data.data.total_users}
                icon={<User />} />
            <StatCard
                title='Total Songs'
                value={data.data.total_songs}
                icon={<Disc />} />
            <StatCard
                title='Total Playlists'
                value={data.data.total_playlists}
                icon={<List />} />
            <StatCard
                title='Total Genres'
                value={data.data.total_genres}
                icon={<Tag />} />
        </div>
    )
}

export default Statistics