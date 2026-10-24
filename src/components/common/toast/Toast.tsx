
"use client";

import COLORS from "@/src/constants/colors";
import useToastStore from "@/src/store/toastStore";
import toastIcons from "./data/toastIcons";
import { IoClose } from "react-icons/io5";

const Toast = () => {
    const messages = useToastStore((state) => state.messages);
    const removeToastMessage = useToastStore((state) => state.removeToastMessage);

    return (
        <div className="fixed top-0 left-0 z-100 w-full pointer-events-none">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 pt-3">
                {messages.map((message) => {
                    const Icon = toastIcons[message.type];

                    return (
                        <div
                            key={message.id}
                            role={message.type === "error" ? "alert" : "status"}
                            className="relative isolate flex items-center gap-3 overflow-hidden rounded-lg border border-white/20 p-3 text-white/95 shadow-[0_4px_16px_rgba(0,0,0,0.18),0_0_20px_rgba(255,255,255,0.08)] pointer-events-auto"
                            style={{
                                backgroundColor: COLORS.toast[message.type],
                                boxShadow: `0 4px 16px rgba(0,0,0,0.18), 0 0 18px ${COLORS.toast[message.type]}55`,
                            }}
                        >

                            <div
                                aria-hidden="true"
                                className="absolute inset-0 z-[-1] origin-left animate-toast-progress bg-black/20"
                                style={{ animationDuration: `${message.timeout}ms` }}
                            />

                            <Icon className="relative z-10 shrink-0" />

                            <p className="relative z-10 flex-1 text-sm font-medium">
                                {message.message}
                            </p>

                            <button
                                type="button"
                                title="Close notification"
                                aria-label="Close notification"
                                className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full transition hover:bg-black/10"
                                onClick={() => removeToastMessage(message.id)}
                            >
                                <IoClose size={20} />
                            </button>
                        </div>
                    );
                })}
            </div>

            <style jsx>{`
                @keyframes toast-progress {
                    from {
                        transform: scaleX(1);
                    }
                    to {
                        transform: scaleX(0);
                    }
                }

                .animate-toast-progress {
                    animation-name: toast-progress;
                    animation-timing-function: linear;
                    animation-fill-mode: forwards;
                }

                @media (prefers-reduced-motion: reduce) {
                    .animate-toast-progress {
                        animation: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default Toast;