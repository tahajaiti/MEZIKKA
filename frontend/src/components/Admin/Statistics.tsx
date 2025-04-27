import { Disc, List, Tag, User } from 'lucide-react'
import StatCard from './StatCard'

const Statistics = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <StatCard
                title='Total Users'
                value='1,234'
                icon={<User />} />
            <StatCard
                title='Total Songs'
                value='1,234'
                icon={<Disc />} />
            <StatCard
                title='Total Playlists'
                value='1,234'
                icon={<List />} />
            <StatCard
                title='Total Genres'
                value='1,234'
                icon={<Tag />} />
        </div>
    )
}

export default Statistics