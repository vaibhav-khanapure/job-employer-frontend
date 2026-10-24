import { type ChangeEvent, Fragment, KeyboardEvent, type SubmitEvent, useEffect, useRef, useState } from "react";
import type { AuthFormType } from "../../../types/auth.types";
import { useRouter } from "next/navigation";
import useSchemaValidator from "@/src/hooks/useSchemaValidator";
import validationSchemas from "@/src/validationSchemas/validationSchema";
import { useMutation } from "@tanstack/react-query";
import API from "@/src/lib/API";
import toast from "@/src/lib/toast";
import FormError from "@/src/components/common/errors/FormError";
import Loaders from "@/src/components/common/loaders/loaders";
import verificationCodeValidator from "@/src/utils/validators/verificationCodeValidator";

interface Props {
    email: string;
    handleChangeForm: (type: AuthFormType) => void;
};

const RegisterConfirm = ({ email, handleChangeForm }: Props) => {
    const [code, setCode] = useState<string[]>(Array(6).fill(""));

    const inputRefs = useRef<HTMLInputElement[]>([]);

    const { replace } = useRouter();

    const { errors, handleValidateSchema } = useSchemaValidator(validationSchemas.auth.registerConfirm, {
        email,
        code: code.join("")
    });

    useEffect(() => {
        if (inputRefs?.current) {
            inputRefs.current[0].focus();
        };
    }, [inputRefs]);

    const { error, isPending, mutate } = useMutation({
        mutationFn: async (values: { code: string; email: string }) => {
            const { data } = await API.post("/auth/register-confirm", values);
            return data;
        },
        onError: (error) => toast.error(error?.errorMessage),
        onSuccess: (data, values) => {

            replace("/home");
        }
    });

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isPending) return;

        const { success, data } = handleValidateSchema();

        if (success && data) {
            mutate(data);
        };
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "ArrowLeft" && index > 0 && code[index - 1] !== "") {
            e.preventDefault();
            inputRefs.current[index - 1]?.focus();
        };

        if (e.key === "ArrowRight" && index < code.length - 1 && code[index + 1] !== "") {
            e.preventDefault();
            inputRefs.current[index + 1]?.focus();
        };

        if (e.key === "Backspace" && index > 0 && code[index] === "") {
            e.preventDefault();
            inputRefs.current[index - 1]?.focus();
        };
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.toUpperCase();

        if (!verificationCodeValidator(value)) return;

        setCode(prev => prev.map((char, i) => (i === index ? value : char)));

        if (value && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        };
    };

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex items-center justify-center gap-2 sm:gap-4">
                {code.map((char, index) => (
                    <input
                        key={`register-confirm-code-${index}`}
                        value={char}
                        // disabled={index > 0 && code[index - 1] === ""}
                        maxLength={1}
                        className="size-10 rounded-md text-center text-lg outline-none border border-gray-300 focus:border-gray-600"
                        onKeyDown={e => handleKeyDown(e, index)}
                        onChange={e => handleChange(e, index)}
                        ref={el => {
                            if (el) inputRefs.current[index] = el;
                        }}
                    />
                ))}
            </div>

            {error && <FormError message={error?.message} />}
            {errors?.code && <FormError message={errors?.code} />}

            <button type="submit" className="btn" disabled={isPending}>
                {isPending ? <Loaders.Spinner className="size-2" /> : (
                    <Fragment>
                        Create my Account &nbsp;
                        <span aria-hidden="true"> →</span>
                    </Fragment>
                )}
            </button>

            <p className="text-sm text-center text-gray-400">
                Already have an account?{' '}
                <span
                    onClick={() => handleChangeForm("login")}
                    className="label cursor-pointer underline text-gray-800 hover:text-primary"
                >
                    Sign In
                </span>
            </p>
        </form>
    );
};

export default RegisterConfirm;