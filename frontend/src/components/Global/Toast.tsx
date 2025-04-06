import { createPortal } from "react-dom";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import useToastStore from "../../stores/useToastStore";

const Toast = () => {
    const { message, type, isVisible, hideToast } = useToastStore();

    if (!isVisible) return null;

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-500" />,
        error: <AlertCircle className="w-5 h-5 text-red-500" />,
        info: <Info className="w-5 h-5 text-blue-500" />,
    };

    const toastContent = (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
            <div className="flex items-center p-4 rounded-lg border border-zinc-700 bg-zinc-900/50 backdrop-blur-lg shadow-lg max-w-md">
                <div className="flex-shrink-0 mr-3">{icons[type]}</div>
                <div className="flex-1 mr-2">
                    <p className="text-sm text-white">{message}</p>
                </div>
                <button
                    onClick={hideToast}
                    className="flex-shrink-0 p-1 rounded-full hover:bg-zinc-800 transition-colors"
                >
                    <X className="w-4 h-4 text-zinc-400" />
                </button>
            </div>
        </div>
    );

    return createPortal(toastContent, document.body);
};

export default Toast;