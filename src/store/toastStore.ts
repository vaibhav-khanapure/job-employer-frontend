import { create } from "zustand";
import type { ToastMessage, ToastStoreState, ToastStoreTypes } from "../types/store/toastStore.types";

const initialState: ToastStoreState = {
    messages: []
};

const useToastStore = create<ToastStoreTypes>((set, get) => ({
    ...initialState,

    createToastMessage: (message: Pick<ToastMessage, "message" | "type"> & { timeout?: number }) => {
        const newMessage: ToastMessage = {
            id: Math.random(),
            message: message?.message,
            type: message?.type,
            timeout: message?.timeout ?? 15000
        };

        set(prevState => ({
            messages: [newMessage, ...prevState.messages]
        }));

        setTimeout(() => get().removeToastMessage(newMessage.id), newMessage.timeout);
    },

    removeToastMessage: (id: number) => {
        set(prevState => ({
            messages: prevState.messages.filter(message => message?.id !== id)
        }));
    },

    resetState: () => set({ messages: [] }),
}));

export default useToastStore;