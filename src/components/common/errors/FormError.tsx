import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLParagraphElement> {
    message: string;
};

const FormError = ({ className, message, ...props }: Props) => {
    if (!message) return null;

    return (
        <p className={`text-sm font-medium text-error mt-2 ${className}`} {...props}>
            {message}
        </p>
    );
};

export default FormError;