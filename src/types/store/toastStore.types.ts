export interface ToastMessage {
    id: number;
    message: string;
    type: "error" | "info" | "success" | "warning";
    timeout: number;
};

export interface ToastStoreState {
    messages: ToastMessage[];
};

export interface ToastStoreActions {
    createToastMessage: (message: Pick<ToastMessage, "message" | "type"> & {timeout?: number}) => void;
    removeToastMessage: (id: number) => void;
    resetState: () => void;
};

export interface ToastStoreTypes extends ToastStoreState, ToastStoreActions { };