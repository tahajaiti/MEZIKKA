import { LoaderCircleIcon } from "lucide-react";

interface ButtonProps {
    color?: string;
    text?: string;
    textColor?: string;
    type?: 'button' | 'submit' | 'reset';
    isPending?: boolean;
}

const ButtonLarge = ({ color = "red", text = 'LOG IN', type = 'button', textColor = 'white', isPending = false }: ButtonProps) => {

    return (
        <button
            disabled={isPending}
            type={type}
            className={` w-full p-4 sm:p-4 sm:text-xl rounded-full bg-red-600 text-xl font-bold shadow-lg shadow-red-500/20
                        transition-all  cursor-pointer hover:bg-red-500`}
        >
            {isPending ? <LoaderCircleIcon className="animate-spin m-auto" /> : text}
        </button>
    );
};

export default ButtonLarge;
