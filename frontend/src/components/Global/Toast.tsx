import { createPortal } from "react-dom";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { motion } from "motion/react";
import useToastStore from "../../stores/useToastStore";

const Toast = () => {
    const { message, type, isVisible, hideToast } = useToastStore();

    if (!isVisible) return null;

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-500" />,
        error: <AlertCircle className="w-5 h-5 text-red-500" />,
        info: <Info className="w-5 h-5 text-blue-300" />,
    };

    const animVariants = {
        hidden: {
            opacity: 0,
            y: -120,
            transition: { duration: 0.2 },
        },
        seen: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.2, ease: ["easeInOut"] },
        },
    };

    const toastContent = (
        <motion.div
            variants={animVariants}
            initial="hidden"
            animate="seen"
            exit="hidden"
            className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50"
        >
            <div className="flex items-center p-4 rounded-md border border-zinc-800 bg-zinc-900/50 backdrop-blur-md shadow-lg max-w-md">
                <div className="flex-shrink-0 mr-3">{icons[type]}</div>
                <div className="flex-1 mr-2">
                    <p className="text-sm text-zinc-200">{message}</p>
                </div>
                <button
                    onClick={hideToast}
                    className="flex-shrink-0 p-1 rounded-full hover:bg-zinc-800 hover:text-red-400 transition-colors"
                    aria-label="Close toast"
                >
                    <X className="w-4 h-4 text-zinc-400" />
                </button>
            </div>
        </motion.div>
    );

    return createPortal(toastContent, document.body);
};

export default Toast;