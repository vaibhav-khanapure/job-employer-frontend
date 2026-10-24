import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    color?: string;
};

const Spinner = ({ className, size = 20, color = "#fff", style, ...props }: Props) => {
    return (
        <div
            className={`size-8 rounded-full border-t-transparent animate-spin ${className}`}
            style={{ height: size, width: size, border: `2px solid ${color}`, borderTop: `2px solid transparent`, ...style }}
            {...props}
        />
    );
};

export default Spinner;