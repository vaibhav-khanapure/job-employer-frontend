"use client";

import { type InputHTMLAttributes, type JSX, type Ref, useId, useState } from "react";
import FormError from "../errors/FormError";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    ref?: Ref<HTMLInputElement>;
    LabelRightComponent?: () => JSX.Element;
};

const PasswordInput = ({ label, error, className, ref, maxLength = 30, LabelRightComponent, ...props }: Props) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputId = useId();

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                {label && <label htmlFor="password" className="label">{label || "Password"}</label>}
                {LabelRightComponent && <LabelRightComponent />}
            </div>

            <div className="relative overflow-hidden">
                <input
                    className={`input pr-20 ${className}`}
                    id={inputId}
                    ref={ref}
                    maxLength={maxLength}
                    type={showPassword ? "text" : "password"}
                    {...props}
                />

                <button
                    type="button"
                    className="absolute inset-y-0 right-3 text-sm font-semibold text-gray-500 transition-colors hover:text-primary"
                    onClick={() => setShowPassword(prev => !prev)}
                >
                    {showPassword ? 'Hide' : 'Show'}
                </button>
            </div>

            {error && <FormError message={error} />}
        </div>
    );
};

export default PasswordInput;