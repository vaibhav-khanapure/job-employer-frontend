import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
};

const Modal = ({ children }: Props) => {
    return (
        <div className="fixed h-screen w-full top-0 left-0 z-999 grid place-items-center bg-primary/40 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-3xl border border-border bg-bg-primary p-7 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                {children}
            </div>
        </div>
    );
};

export default Modal;