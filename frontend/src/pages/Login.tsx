import authBg from '@assets/authBg.png'
import MezikkaText from '../components/Texts/MezikkaText'
import { EyeOff, Mail } from 'lucide-react'
import ButtonLarge from '../components/Buttons/ButtonLarge'

const Login = () => {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-[#161515]'>
      <img
        className='absolute top-0 left-0 w-full h-full object-cover opacity-50 blur-md'
        src={authBg}
        alt="background image containing rap albums" />

      <div className='p-4 px-16 flex flex-col items-center justify-between gap-10 z-10 bg-black h-1/2 w-1/3 rounded-[5px]'>
        <MezikkaText />
        <h2 className='text-4xl font-semibold mb-4'>Music Made Fun</h2>

        <form className='flex flex-col items-center justify-center w-full gap-2'>
          <div className="relative w-full mb-4">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              className="bg-[#373737] text-white p-3 py-4 w-full rounded-[2px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Email"
              type="email"
              required
            />
            <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
          </div>
          <div className="relative w-full mb-4">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              className="bg-[#373737] text-white p-3 py-4 w-full rounded-[2px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Passowrd"
              type="password"
              required
            />
            <EyeOff className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
          </div>

          <ButtonLarge type='submit'/>
        </form>
        <p className='text-white/40 text-sm'>Don't have an account? <span className='text-white font-bold'>SIGN UP</span></p>
        <p>Reset Password</p>
      </div>

    </main>
  )
}

export default Login