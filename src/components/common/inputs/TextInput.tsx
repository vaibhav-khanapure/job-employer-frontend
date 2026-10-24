"use client";

import { type InputHTMLAttributes, type Ref, useId } from "react";
import FormError from "../errors/FormError";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    ref?: Ref<HTMLInputElement>;
};

const TextInput = ({ label, error, className, ref, ...props }: Props) => {
    const inputId = useId();

    return (
        <div className="flex flex-col gap-2">
            {label && <label htmlFor={inputId} className="label">{label}</label>}

            <input
                className={`input ${className}`}
                id={inputId}
                ref={ref}
                {...props}
            />

            {error && <FormError message={error} />}
        </div>
    );
};

export default TextInput;