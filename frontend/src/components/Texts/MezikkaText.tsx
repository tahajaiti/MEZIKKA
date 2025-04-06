import { Link } from "@tanstack/react-router"

const MezikkaText = () => {
  return (
    <Link to="/" className='text-red-500 m-auto md:m-0 text-4xl w-fit font-viga tracking-[0.4em] 
    cursor-pointer hover:text-shadow-red-500 hover:text-shadow-lg hover:font-bold 
    hover:text-white
    transition-all'>MEZIKKA</Link>
  )
}

export default MezikkaText