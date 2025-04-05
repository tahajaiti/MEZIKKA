import authBg from '@assets/authBg.png'
import MezikkaText from '../components/Texts/MezikkaText'
import { EyeOff, Mail } from 'lucide-react'
import ButtonLarge from '../components/Buttons/ButtonLarge'
import AuthInput from '../components/Inputs/AuthInput'

const Login = () => {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-[#161515]'>
      <img
        className='absolute top-0 left-0 w-full h-full object-cover opacity-50 blur-sm'
        src={authBg}
        alt="background image containing rap albums" />

      <div className='p-8 px-16 flex flex-col items-center justify-between gap-10 z-10 bg-black h-1/2 w-1/3 rounded-[5px]'>
        <MezikkaText />
        <h2 className='text-4xl font-semibold mb-4'>Music Made Fun</h2>

        <form className='flex flex-col items-center justify-center w-full gap-2'>
          <AuthInput
            id="email"
            placeholder="Email"
            type="email"
            icon={<Mail />}
            required
          />
          <AuthInput
            id="password"
            placeholder="Password"
            type="password"
            icon={<EyeOff />}
            required
          />

          <ButtonLarge type='submit' />
        </form>
        <p className='text-white/40 text-sm'>Don't have an account? <span className='text-white font-bold'>SIGN UP</span></p>
        <p>Reset Password</p>
        <div className='bg-white/40 w-full h-1'></div>
        <ButtonLarge type='button' text='LOG IN WITH GOOGLE' color='FFFFFF' textColor='black' />
      </div>

    </main>
  )
}

export default Login