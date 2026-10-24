import useToastStore from "../store/toastStore";
import type { ToastMessage } from "../types/store/toastStore.types";

interface ToastOptions {
    timeout?: number;
};

const createToast = (type: ToastMessage["type"]) => {
    return (message: string, options?: ToastOptions) => {
        const newToast: Pick<ToastMessage, "message" | "type"> & { timeout?: number } = {
            message,
            type
        };

        if (options?.timeout) {
            newToast["timeout"] = options?.timeout
        };

        useToastStore.getState().createToastMessage(newToast);
    };
};

const toast = {
    error: createToast("error"),
    info: createToast("info"),
    success: createToast("success"),
    warning: createToast("warning"),
};

export default toast;