import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Eye, Mail, User } from 'lucide-react';
import authBg from '@assets/authBg.png';
import MezikkaText from '../components/Texts/MezikkaText';
import { validateEmail, validatePassword } from '../util/Validators';
import AuthInput from '../components/Inputs/AuthInput';
import ButtonLarge from '../components/Buttons/ButtonLarge';
import { useSignup } from '../api/services/auth/query';


const Signup = () => {
    const [formData, setFormData] = useState<{
        username: string;
        email: string;
        password: string;
    }>({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<{
        username: string | null;
        email: string | null;
        password: string | null;
    }>({
        username: null,
        email: null,
        password: null,
    });

    const { mutate: signup, isPending, error: signupErr } = useSignup();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));

        if (id === 'email') {
            setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
        } else if (id === 'password') {
            setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
        } else if (id === 'username') {
            setErrors((prev) => ({ ...prev, username: formData.username.length < 2 ? 'Username must be at least 3 characters long' : null }))
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const usernameErr = formData.username.length < 2 ? 'Username must be at least 3 characters long' : null;
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);

        setErrors({ username: usernameErr, email: emailError, password: passwordError });

        if (!emailError && !passwordError) {
            signup(
                { name: formData.username, email: formData.email, password: formData.password },
                {
                    onSuccess: (data) => {
                        console.log('Signup successful:', data.data.data);
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
                    Explore music that's fun!
                </h2>

                <form onSubmit={handleSubmit}
                    className="flex flex-col items-center justify-center w-full gap-4"
                >

                    <AuthInput
                        id="username"
                        placeholder="Username"
                        type="text"
                        icon={<User />}
                        required
                        value={formData.username}
                        onChange={handleChange}
                        error={errors.username}
                    />

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
                        placeholder="Passowrd"
                        type="password"
                        icon={<Eye />}
                        required
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                    />

                    <ButtonLarge type='submit' isPending={isPending} />
                </form>

                {signupErr && (
                    <p className="text-red-500 text-sm text-center">
                        {signupErr.message || 'An error occurred'}
                    </p>
                )}

                <p className="text-white/40 text-sm text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-white font-bold">LOG IN</Link>
                </p>
            </div>
        </main>
    )
}

export default Signup