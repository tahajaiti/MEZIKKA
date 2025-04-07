import { createPortal } from "react-dom";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { motion } from 'motion/react';
import useToastStore from "../../stores/useToastStore";

const Toast = () => {
    const { message, type, isVisible, hideToast } = useToastStore();

    if (!isVisible) return null;

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-red-500" />,
        error: <AlertCircle className="w-5 h-5 text-red-500" />,
        info: <Info className="w-5 h-5 text-zinc-300" />,
    };

    const animVariants = {
        hidden: {
            opacity: 0,
            x: 120,
            transition: { duration: 0.1 }
        },
        seen: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.2 }
        },
    }

    const toastContent = (
        <motion.div
            variants={animVariants}
            initial="hidden"
            animate="seen"
            exit="hidden"
            className="fixed top-4 right-4 z-50 duration-300">
            <div className="flex items-center p-4 rounded-md border border-zinc-800 bg-zinc-900/50 backdrop-blur-md shadow-lg max-w-md">
                <div className="flex-shrink-0 mr-3">{icons[type]}</div>
                <div className="flex-1 mr-2">
                    <p className="text-sm text-zinc-200">{message}</p>
                </div>
                <button
                    onClick={hideToast}
                    className="flex-shrink-0 p-1 rounded-full hover:bg-zinc-800 hover:text-red-400 transition-colors"
                >
                    <X className="w-4 h-4 text-zinc-400" />
                </button>
            </div>
        </motion.div>
    );

    return createPortal(toastContent, document.body);
};

export default Toast;