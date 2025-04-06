import { create } from "zustand"

type ToastType = "success" | "error" | "info"

interface ToastState {
    message: string
    type: ToastType
    isVisible: boolean
    duration: number
    showToast: (message: string, type?: ToastType, duration?: number) => void
    hideToast: () => void
}

export const useToastStore = create<ToastState>((set) => ({
    message: "",
    type: "info",
    isVisible: false,
    duration: 3000,

    showToast: (message, type = "info", duration = 3000) => {
        set({ message, type, isVisible: true, duration })

        setTimeout(() => {
            set({ isVisible: false })
        }, duration)
    },

    hideToast: () => set({ isVisible: false }),
}))

