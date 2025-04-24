import { motion } from 'motion/react';
import NewMezikkaCarousel from '../components/Home/NewMezikkaCarousel';
import GenreCarousel from '../components/Home/GenreCarousel';


const Home: React.FC = () => {



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full h-full pt-16 p-8 bg-gradient-to-br from-red-950 to-zinc-950 overflow-y-auto flex flex-col gap-8">

      <NewMezikkaCarousel />

      <GenreCarousel />

    </motion.div>
  )
}

export default Home
