import React, { useState } from 'react'
import { EyeOff, Mail } from 'lucide-react'
import authBg from '@assets/authBg.png'
import MezikkaText from '../components/Texts/MezikkaText'
import ButtonLarge from '../components/Buttons/ButtonLarge'
import AuthInput from '../components/Inputs/AuthInput'
import { validateEmail, validatePassword } from '../util/Validators'
import { useLogin } from '../api/services/auth/query'

const Login = () => {
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<{
    email: string | null;
    password: string | null;
  }>({
    email: '',
    password: ''
  });

  const { mutate: login, isPending, error: loginErr } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));

    if (id === 'email') {
      setErrors(prev => ({ ...prev, email: validateEmail(value) }));
    } else if (id === 'password') {
      setErrors(prev => ({ ...prev, password: validatePassword(value) }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({ email: emailError, password: passwordError });

    if (!emailError && !passwordError) {
      login(
        { email: formData.email, password: formData.password },
        {
          onSuccess: (data) => {
            console.log('Login successful:', data);
          }
        }
      );
    }
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-[#161515]'>
      <img
        className='absolute top-0 left-0 w-full h-full object-cover opacity-50 blur-sm'
        src={authBg}
        alt="background image containing rap albums" />

      <div className='p-8 px-16 flex flex-col items-center justify-between gap-10 z-10 bg-black h-1/2 w-1/3 rounded-[5px]'>
        <MezikkaText />
        <h2 className='text-4xl font-semibold mb-4'>Music Made Fun</h2>

        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center w-full gap-2'>
          <AuthInput
            id="email"
            placeholder="Email"
            type="email"
            icon={<Mail />}
            required
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <AuthInput
            id="password"
            placeholder="Password"
            type="password"
            icon={<EyeOff />}
            required
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <ButtonLarge type='submit' />
        </form>

        {loginErr && (
          <p className="text-red-500 text-sm">{loginErr.message || 'An error occurred'}</p>
        )}

        <p className='text-white/40 text-sm'>Don't have an account? <span className='text-white font-bold'>SIGN UP</span></p>
        <p>Reset Password</p>
        <div className='bg-white/40 w-full h-1'></div>
        <ButtonLarge type='button' text='LOG IN WITH GOOGLE' color='FFFFFF' textColor='black' />
      </div>

    </main>
  )
}

export default Login