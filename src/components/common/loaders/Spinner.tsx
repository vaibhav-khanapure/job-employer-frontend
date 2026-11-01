import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
    borderSize?: number;
    size?: number;
    color?: string;
};

const Spinner = ({ className, borderSize = 2, size = 20, color = "#fff", style, ...props }: Props) => {
    return (
        <div
            className={`size-8 rounded-full border-t-transparent animate-spin ${className}`}
            style={{
                height: size,
                width: size,
                border: `${borderSize}px solid ${color}`, borderTop: `${borderSize}px solid transparent`,
                ...style
            }}
            {...props}
        />
    );
};

export default Spinner;