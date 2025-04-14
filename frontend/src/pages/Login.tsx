import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { EyeOff, Mail } from 'lucide-react';
import authBg from '@assets/authBg.png';
import MezikkaText from '../components/Texts/MezikkaText';
import ButtonLarge from '../components/Buttons/ButtonLarge';
import AuthInput from '../components/Inputs/AuthInput';
import { validateEmail, validatePassword } from '../util/Validators';
import { useLogin } from '../api/services/auth/query';

const Login = () => {
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{
    email: string | null;
    password: string | null;
  }>({
    email: null,
    password: null,
  });

  const navigate = useNavigate();

  const { mutate: login, isPending, error: loginErr } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (id === 'email') {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    } else if (id === 'password') {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
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
          onSuccess: () => {
            navigate('/');
          },
        }
      );
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#161515] px-4">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50 blur-sm"
        src={authBg}
        alt="background image containing rap albums"
      />

      <div className="p-4 sm:p-6 md:p-8 lg:px-16 flex flex-col items-center justify-between gap-4 sm:gap-6 md:gap-10 z-10 bg-black w-full max-w-md sm:max-w-lg md:max-w-xl rounded-[5px]">
        <MezikkaText />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-center">
          Music Made Fun
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full gap-4"
        >
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

          <ButtonLarge type="submit" isPending={isPending} />
        </form>

        {loginErr && (
          <p className="text-red-500 text-sm text-center">
            {loginErr.message || 'An error occurred'}
          </p>
        )}

        <p className="text-white/40 text-sm text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-white font-bold">SIGN UP</Link>
        </p>
        <p className="text-white/40 text-sm text-center">Reset Password</p>
        {/* <div className="bg-white/40 w-full h-1"></div>
        <ButtonLarge
          type="button"
          text="LOG IN WITH GOOGLE"
          color="FFFFFF"
          textColor="black"
        /> */}
      </div>
    </main>
  );
};

export default Login;