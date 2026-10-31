"use client";

import type { ChangeEvent, InputHTMLAttributes, KeyboardEvent, RefObject } from "react";
import FormError from "../errors/FormError";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
    tag: string;
    value: string[];
    refs: RefObject<HTMLInputElement[]>;
    handleChange?: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
    handleKeyDown?: (e: KeyboardEvent<HTMLInputElement>, index: number) => void;
};

const CodeInput = ({ error, label, refs, tag, className, value, handleChange, handleKeyDown, ...props }: Props) => {
    return (
        <div className="flex flex-col gap-2">

            {label && <label htmlFor={`${tag}-${0}`} className="label">{label}</label>}

            <div className="flex items-center justify-center gap-2 sm:gap-4">
                {Array.from({ length: value.length }).map((_, index) => (
                    <input
                        key={`${tag}-${index}`}
                        id={`${tag}-${index}`}
                        // disabled={index > 0 && code[index - 1] === ""}
                        maxLength={1}
                        className={`size-11 rounded-md text-center text-lg outline-none border border-gray-300 focus:border-gray-600 ${className}`}
                        value={value?.[index]}
                        onKeyDown={e => handleKeyDown && handleKeyDown(e, index)}
                        onChange={e => handleChange && handleChange(e, index)}
                        ref={el => {
                            if (el) refs.current[index] = el;
                        }}
                        {...props}
                    />
                ))}
            </div>

            {error && <FormError message={error} />}

        </div>
    );
};

export default CodeInput;