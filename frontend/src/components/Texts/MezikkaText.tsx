import { Link } from "react-router"
import { motion } from 'motion/react';
const textVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 40,
      duration: 0.2
    }
  },
  closed: {
    opacity: 0,
    x: -500,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    }
  }
};

const MezikkaText = () => {

  return (
    <motion.div
      variants={textVariants}
      initial="closed"
      animate="open"
      exit="closed"
      key="mezzika"
    >
      <Link to="/" className='text-red-500 m-auto md:m-0 text-2xl md:text-4xl w-fit font-viga tracking-[0.4em] 
          cursor-pointer hover:text-shadow-red-500 hover:text-shadow-lg hover:font-bold 
          hover:text-white
          transition-all'>MEZIKKA</Link>
    </motion.div>
  )
}

export default MezikkaText