import FormError from "@/src/components/common/errors/FormError";
import { useId, type ReactNode } from "react";

interface Props {
    emptyValueInfo?: string;
    error?: string;
    icon: ReactNode;
    isEditing: boolean;
    label: string;
    min?: number;
    max?: number;
    maxLength?: number;
    onBlur?: () => void;
    onChange: (value: string) => void;
    onFocus?: () => void;
    placeholder: string;
    value: string;
};

const InfoRow = (props: Props) => {
    const { emptyValueInfo, icon, isEditing, label, onChange, placeholder, value, error, max, min, maxLength, onBlur, onFocus } = props;

    const inputId = useId();

    return (
        <div className="flex items-start gap-2">

            <div className="size-10 rounded-md grid place-items-center text-text-tertiary border border-border-primary">
                {icon}
            </div>

            <div className="flex flex-col gap-2 flex-1">
                <label htmlFor={inputId} className="label ml-2 text-[13px] font-medium text-text-tertiary">
                    {label}
                </label>

                {isEditing ? (
                    <input
                        className="p-2 text-sm w-full outline-none border-b border-b-border-primary placeholder:italic placeholder:text-text-muted"
                        value={value}
                        id={inputId}
                        placeholder={placeholder}
                        min={min}
                        max={max}
                        maxLength={maxLength}
                        onChange={(e) => onChange(e.target.value)}
                        onFocus={() => onFocus && onFocus()}
                        onBlur={() => onBlur && onBlur}
                    />
                ) : (
                    <p className={`text-sm ml-2 ${value ? "text-text-primary" : "italic text-text-muted"}`}>
                        {value || emptyValueInfo || placeholder}
                    </p>
                )}

                {error && <FormError message={error} />}
            </div>
        </div>
    );
};

export default InfoRow;