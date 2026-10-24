import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLParagraphElement> {
    message: string;
};

const FormError = ({ className, message, ...props }: Props) => {
    if (!message) return null;

    return (
        <p className={`text-[13px] font-medium text-error mt-1 ${className}`} {...props}>
            {message}
        </p>
    );
};

export default FormError;