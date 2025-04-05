import authBg from '@assets/authBg.png'
import MezikkaText from '../components/Texts/MezikkaText'

const Login = () => {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-[#161515]'>
      <img
        className='absolute top-0 left-0 w-full h-full object-cover opacity-50 blur-md'
        src={authBg}
        alt="background image containing rap albums" />

      <div className='p-4 flex flex-col items-center justify-center z-10 bg-black h-1/2 w-1/2'>
          <MezikkaText />
      </div>

    </main>
  )
}

export default Login