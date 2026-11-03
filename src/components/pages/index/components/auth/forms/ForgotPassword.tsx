import useSchemaValidator from "@/src/hooks/useSchemaValidator";
import API from "@/src/lib/API";
import toast from "@/src/lib/toast";
import validationSchemas from "@/src/validationSchemas/validationSchema";
import { useMutation } from "@tanstack/react-query";
import { type SubmitEvent, useState } from "react";
import type { AuthFormType } from "../../../types/auth.types";
import TextInput from "@/src/components/common/inputs/TextInput";
import AuthButton from "../components/AuthButton";

interface Props {
    handleChangeForm: (type: AuthFormType) => void;
    handleUpdateEmail: (email: string) => void;
};

const ForgotPassword = ({ handleChangeForm, handleUpdateEmail }: Props) => {
    const [email, setEmail] = useState("");

    const { errors, handleValidateSchema } = useSchemaValidator(validationSchemas.auth.forgotPassword, { email });

    const { isPending, mutate } = useMutation({
        mutationFn: async (email: string) => {
            const { data } = await API.post("/auth/forgot-password", { email });
            return data;
        },
        onError: (error) => toast.error(error?.errorMessage),
        onSuccess: (_, email) => {
            handleUpdateEmail(email);
            handleChangeForm("reset-password");

            toast.info("Password reset code sent to your email. It is valid for 5 minutes.");
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

            <AuthButton isPending={isPending} text="Send code to email" />

        </form>
    );
};

export default ForgotPassword;