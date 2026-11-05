import type { ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface Props {
    children: ReactNode;
    title?: string;
    handleClose?: () => void;
};

const Modal = ({ children, title, handleClose }: Props) => {
    return (
        <div className="fixed h-screen w-full top-0 left-0 z-999 grid place-items-center bg-primary/40 backdrop-blur-sm">
            <div className="relative flex flex-col gap-2 w-full max-w-md rounded-3xl border border-border bg-bg-primary p-7 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">

                {(title || handleClose) && (
                    <div className={`flex items-center *:flex-1`}>

                        {title && <h3 className="text-left font-semibold text-xl">{title}</h3>}

                        {handleClose && (
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    aria-label="Close"
                                    className="grid size-10 place-items-center rounded-full transition-all duration-500 text-text-muted hover:bg-bg-secondary hover:text-text-primary"
                                >
                                    <IoCloseOutline size={20} />
                                </button>
                            </div>
                        )}

                    </div>
                )}

                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;