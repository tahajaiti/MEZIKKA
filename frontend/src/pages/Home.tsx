import { motion } from 'motion/react';
import NewMezikkaCarousel from '../components/Home/NewMezikkaCarousel';
import GenreCarousel from '../components/Home/GenreCarousel';
import MostLikedCarousel from '../components/Home/MostLikedCarousel';


const Home: React.FC = () => {



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full h-full pt-16 p-8 bg-gradient-to-br from-red-900 to-zinc-950 overflow-y-auto flex flex-col gap-8">



      <div className='mx-32'>
        <GenreCarousel />
        <NewMezikkaCarousel />
        <MostLikedCarousel />
      </div>

    </motion.div>
  )
}

export default Home
