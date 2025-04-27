import { motion } from 'motion/react'
import Statistics from '../components/Admin/Statistics'

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='w-full h-full pt-16 p-8 bg-gradient-to-br from-gray-700 to-zinc-950 overflow-y-auto flex flex-col gap-8'>


      <Statistics />


    </motion.div>
  )
}

export default Dashboard