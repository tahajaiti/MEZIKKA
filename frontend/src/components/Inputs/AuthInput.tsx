import { ReactNode } from 'react';

interface AuthInputProps {
    id: string;
    placeholder: string;
    type: 'text' | 'email' | 'password';
    icon: ReactNode;
    required?: boolean;
}

const AuthInput = ({ id, placeholder, type, icon, required = false }: AuthInputProps) => {
    return (
        <div className="relative w-full mb-4">
            <label htmlFor={id} className="sr-only">
                {placeholder}
            </label>
            <input
                id={id}
                className="bg-[#373737] text-white p-3 py-4 w-full rounded-[2px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder={placeholder}
                type={type}
                required={required}
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5">
                {icon}
            </span>
        </div>
    );
};

export default AuthInput;