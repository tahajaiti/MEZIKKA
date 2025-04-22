import { create } from "zustand";



interface ConfirmState {
    isVisible: boolean;
    message: string;
    onConfirm: () => void;
    showModal: (message: string, onConfirm: () => void) => void;
}


const useConfirmStore = create<ConfirmState>((set) => ({
    isVisible: false,
    message: "",
    onConfirm: () => {},
    showModal: (message, onConfirm) => {
        set({ message, isVisible: true, onConfirm });
    },
}));

export default useConfirmStore;