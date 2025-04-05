interface ButtonProps {
    color?: string;
    text?: string;
    textColor?: string;
    type?: 'button' | 'submit' | 'reset';
}

const ButtonLarge = ({ color = '#C70000', text = 'LOG IN', type = 'button', textColor = 'white' }: ButtonProps) => {
    const realColor = color.startsWith('#') ? color : `#${color}`;

    return (
        <button
            type={type}
            style={{ backgroundColor: realColor, color: textColor }}
            className={` w-full p-4 rounded-full text-xl font-bold transition duration-200 ease-in-out cursor-pointer hover:opacity-80`}
        >
            {text}
        </button>
    );
};

export default ButtonLarge;
