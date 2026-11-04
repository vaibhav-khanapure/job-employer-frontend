import type { ReactNode } from "react";

interface Props {
    icon: ReactNode;
    label: string;
    active?: boolean;
    disabled?: boolean;
    onClick: () => void;
};

const ToolbarButton = ({ icon, label, active = false, disabled = false, onClick, }: Props) => {
    return (
        <button
            type="button"
            title={label}
            aria-label={label}
            aria-pressed={active}
            disabled={disabled}
            onMouseDown={(e) => e.preventDefault()}
            onClick={onClick}
            className={`
                size-8 shrink-0 grid place-items-center rounded-md
                transition-all duration-150
                disabled:opacity-35 disabled:cursor-not-allowed
                ${active
                    ? "bg-bg-secondary text-text-primary"
                    : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
                }
            `}
        >
            {icon}
        </button>
    );
};

export default ToolbarButton;