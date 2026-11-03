import { type SubmitEvent, useState } from "react";
import type { AuthFormType } from "../../../types/auth.types";
import useSchemaValidator from "@/src/hooks/useSchemaValidator";
import validationSchemas from "@/src/validationSchemas/validationSchema";
import API from "@/src/lib/API";
import { useMutation } from "@tanstack/react-query";
import toast from "@/src/lib/toast";
import TextInput from "@/src/components/common/inputs/TextInput";
import PasswordInput from "@/src/components/common/inputs/PasswordInput";
import AuthButton from "../components/AuthButton";

interface Props {
    email: string;
    handleChangeForm: (type: AuthFormType) => void;
};

const ResetPassword = ({ email, handleChangeForm }: Props) => {
    const [user, setUser] = useState({
        code: "",
        password: "",
        confirmPassword: ""
    });

    const { errors, handleValidateSchema } = useSchemaValidator(validationSchemas.auth.resetPassword, {
        email,
        ...user
    });

    const { isPending, mutate } = useMutation({
        mutationFn: async (values: Omit<typeof user, "confirmPassword"> & { email: string; }) => {
            const { data } = await API.patch("/auth/reset-password", values);
            return data;
        },
        onError: (error) => toast.error(error?.errorMessage),
        onSuccess: () => {
            toast.success("Password reset successful");
            handleChangeForm("login");
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

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <TextInput
                label="Enter Code"
                error={errors?.code}
                maxLength={6}
                placeholder="Enter your code"
                required
                value={user?.code}
                onChange={e => {
                    const value = e.target.value.toUpperCase();

                    if (/^[A-Z0-9]*$/.test(value)) {
                        setUser(prev => ({ ...prev, code: value }));
                    };
                }}
            />

            <PasswordInput
                label="Password"
                error={errors?.password}
                placeholder="Enter your password"
                required
                value={user?.password}
                onChange={e => setUser(prev => ({ ...prev, password: e.target.value }))}
            />

            <PasswordInput
                label="Confirm password"
                error={errors?.confirmPassword}
                placeholder="Enter your password again"
                required
                value={user?.confirmPassword}
                onChange={e => setUser(prev => ({ ...prev, confirmPassword: e.target.value }))}
            />

            <AuthButton isPending={isPending} text="Reset password" />

        </form>
    );
};

export default ResetPassword;