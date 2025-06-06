import { motion } from 'motion/react'
import Statistics from '../components/Admin/Stats/Statistics'
import { useSearchParams } from 'react-router'
import GenreTab from '../components/Admin/Genre/GenreTab';
import UserTab from '../components/Admin/User/UserTab';
import SongTab from '../components/Admin/Song/SongTab';

const Dashboard = () => {
  const [params] = useSearchParams();
  const tab = params.get('tab') || 'statistics';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='w-full h-full pt-16 p-8 bg-gradient-to-br from-gray-700 to-zinc-950 overflow-y-auto flex flex-col gap-8'>


      {tab === 'statistics' && (
        <Statistics />
      )}

      {tab === 'genres' && (
        <GenreTab />
      )}

      {tab === 'users' && (
        <UserTab />
      )}

      {tab === 'songs' && (
        <SongTab />
      )}

    </motion.div>
  )
}

export default Dashboard