import type { ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface Props {
    children: ReactNode;
    handleClose?: () => void;
};

const Modal = ({ children, handleClose }: Props) => {
    return (
        <div className="fixed h-screen w-full top-0 left-0 z-999 grid place-items-center bg-primary/40 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-3xl border border-border bg-bg-primary p-7 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                {handleClose && (
                    <button
                        type="button"
                        onClick={handleClose}
                        aria-label="Close"
                        className="absolute right-5 top-5 grid size-10 place-items-center rounded-full transition-all text-text-muted hover:bg-bg-secondary hover:text-text-primary"
                    >
                        <IoCloseOutline size={20} />
                    </button>
                )}
                {children}
            </div>
        </div>
    );
};

export default Modal;