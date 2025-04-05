import { LoaderCircleIcon } from "lucide-react";

interface ButtonProps {
    color?: string;
    text?: string;
    textColor?: string;
    type?: 'button' | 'submit' | 'reset';
    isPending?: boolean;
}

const ButtonLarge = ({ color = '#C70000', text = 'LOG IN', type = 'button', textColor = 'white', isPending = false }: ButtonProps) => {
    const realColor = color.startsWith('#') ? color : `#${color}`;

    return (
        <button
            disabled={isPending}
            type={type}
            style={{ backgroundColor: realColor, color: textColor }}
            className={` w-full p-4 sm:p-4 sm:text-xl rounded-full text-xl font-bold transition duration-200 ease-in-out cursor-pointer hover:opacity-80`}
        >
            {isPending ? <LoaderCircleIcon className="animate-spin m-auto" /> : text}
        </button>
    );
};

export default ButtonLarge;
