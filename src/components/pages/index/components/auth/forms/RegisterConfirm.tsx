import type { ChangeEvent, ClipboardEvent, KeyboardEvent, SubmitEvent } from "react";
import { Fragment, useEffect, useRef, useState } from "react";
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
import useUserStore from "@/src/store/userStore";
import useAuthStore from "@/src/store/authStore";
import useCompanyStore from "@/src/store/companyStore";
import authAPIAction from "../../../actions/authAPIAction";

interface Props {
    email: string;
    handleChangeForm: (type: AuthFormType) => void;
};

const RegisterConfirm = ({ email, handleChangeForm }: Props) => {
    const [code, setCode] = useState<string[]>(Array(6).fill(""));
    const [resendTimer, setResendTimer] = useState(60);

    const inputRefs = useRef<HTMLInputElement[]>([]);
    const resendCodeTimerRef = useRef<NodeJS.Timeout | null>(null);

    const { replace } = useRouter();

    const { errors, handleValidateSchema } = useSchemaValidator(validationSchemas.auth.registerConfirm, {
        email,
        code: code.join("")
    });

    useEffect(() => {
        if (inputRefs?.current) {
            inputRefs.current?.[0]?.focus();
        };
    }, [inputRefs]);

    useEffect(() => {
        resendCodeTimerRef.current = setInterval(() => setResendTimer(prev => prev - 1), 1000);

        return () => {
            if (resendCodeTimerRef?.current) clearInterval(resendCodeTimerRef?.current);
        };
    }, []);

    useEffect(() => {
        if (resendTimer === 0 && resendCodeTimerRef?.current) {
            clearInterval(resendCodeTimerRef?.current);
        };
    }, [resendTimer, resendCodeTimerRef]);

    const { isPending: isLoading, mutate: handleSendCodeAgain } = useMutation({
        mutationFn: () => API.post("/auth/resend-code", { email, type: "register" }),
        onError: (error) => toast.error(error?.errorMessage),
        onSuccess: () => {
            toast.success("A new verification code has been sent to your email successfully");
            setResendTimer(60);
            resendCodeTimerRef.current = setInterval(() => setResendTimer(prev => prev - 1), 1000);
        }
    });

    const { isPending, mutate } = useMutation({
        mutationFn: async (data: { code: string; email: string }) => {
            const result = await authAPIAction("/register-confirm", { data });
            return result;
        },
        onError: (error) => toast.error(error?.errorMessage),
        onSuccess: (result) => {
            const { accessToken, company, companySlug, email, name } = result?.data;

            useAuthStore.setState({
                accessToken,
                isAuth: true,
                shouldRegenerateAccessToken: true
            });

            useCompanyStore.setState({
                company: {
                    name: company,
                    slug: companySlug
                },
            });

            useUserStore.setState({
                user: {
                    email,
                    name,
                    role: "admin"
                }
            });

            localStorage.setItem('sha-log', '1');

            toast.success("Registration completed successfully!");

            replace("/home");
        }
    });

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        const pastedValue = e.clipboardData
            .getData("text")
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "")
            .slice(0, code.length);

        if (!pastedValue) return;

        const updatedCode = [...code];

        pastedValue.split("").forEach((char, index) => {
            updatedCode[index] = char;
        });

        setCode(updatedCode);

        inputRefs.current[Math.min(pastedValue.length, code.length) - 1]?.focus();
    };

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
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex items-center justify-center gap-2 sm:gap-4">
                {code.map((char, index) => (
                    <input
                        key={`register-confirm-code-${index}`}
                        value={char}
                        id={`register-confirm-code-${index}`}
                        // disabled={index > 0 && code[index - 1] === ""}
                        maxLength={1}
                        className="size-11 rounded-md text-center text-lg outline-none border border-gray-300 focus:border-gray-600"
                        onKeyDown={e => handleKeyDown(e, index)}
                        onChange={e => handleChange(e, index)}
                        onPaste={handlePaste}
                        ref={el => {
                            if (el) inputRefs.current[index] = el;
                        }}
                    />
                ))}
            </div>

            <div className="-mt-2 text-right mb-2">
                <div
                    className={`text-sm text-gray-400 ${resendTimer === 0 ? "cursor-pointer underline font-medium hover:text-primary" : ""}`}
                    onClick={() => handleSendCodeAgain()}
                >
                    {isLoading ? <Loaders.Spinner /> : (
                        <Fragment>
                            Resend code {resendTimer === 0 ? null : (
                                <span>in {' '}
                                    <b className="text-primary w-4 inline-block">{resendTimer > 9 ? resendTimer : `0${resendTimer}`}</b>
                                </span>
                            )}
                        </Fragment>
                    )}
                </div>
            </div>

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