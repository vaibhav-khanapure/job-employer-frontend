import useSchemaValidator from "@/src/hooks/useSchemaValidator";
import API from "@/src/lib/API";
import toast from "@/src/lib/toast";
import validationSchemas from "@/src/validationSchemas/validationSchema";
import { useMutation } from "@tanstack/react-query";
import { Fragment, SubmitEvent, useState } from "react";
import type { AuthFormType } from "../../../types/auth.types";
import TextInput from "@/src/components/common/inputs/TextInput";
import FormError from "@/src/components/common/errors/FormError";
import Loaders from "@/src/components/common/loaders/loaders";

interface Props {
    handleChangeForm: (type: AuthFormType) => void;
    handleUpdateEmail: (email: string) => void;
};

const ForgotPassword = ({ handleChangeForm, handleUpdateEmail }: Props) => {
    const [email, setEmail] = useState("");

    const { errors, handleValidateSchema } = useSchemaValidator(validationSchemas.auth.forgotPassword, { email });

    const { error, isPending, mutate } = useMutation({
        mutationFn: async (email: string) => {
            const { data } = await API.post("/auth/login", { email });
            return data;
        },
        onError: (error) => toast.error(error?.errorMessage),
        onSuccess: (_, email) => {
            handleUpdateEmail(email);
            handleChangeForm("reset");
        }
    });

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isPending) return;

        const { success, data } = handleValidateSchema();

        if (success && data) {
            mutate(data?.email);
        };
    };

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <TextInput
                label="Email Address"
                error={errors?.email}
                autoComplete="email"
                placeholder="you@gmail.com"
                required
                value={email}
                type="email"
                onChange={e => setEmail(e.target.value)}
            />

            {error && <FormError message={error?.message} />}
            {errors?.code && <FormError message={errors?.code} />}

            <button type="submit" className="btn" disabled={isPending}>
                {isPending ? <Loaders.Spinner className="size-2" /> : (
                    <Fragment>
                        Send code to email &nbsp;
                        <span aria-hidden="true"> →</span>
                    </Fragment>
                )}
            </button>

            <p className="text-sm text-center text-gray-400">
                Don't have an account?{' '}
                <span
                    onClick={() => handleChangeForm("register")}
                    className="label cursor-pointer underline text-gray-800 hover:text-primary"
                >
                    Create account
                </span>
            </p>
        </form>
    );
};

export default ForgotPassword;