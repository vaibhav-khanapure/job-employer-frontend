import { type SubmitEvent, useState } from "react";
import useSchemaValidator from "@/src/hooks/validators/useSchemaValidator";
import validationSchemas from "@/src/validationSchemas/validationSchema";
import { useMutation } from "@tanstack/react-query";
import API from "@/src/lib/API";
import toast from "@/src/lib/toast";
import TextInput from "@/src/components/common/inputs/TextInput";
import PasswordInput from "@/src/components/common/inputs/PasswordInput";
import APP from "@/src/constants/app";
import AuthButton from "../components/AuthButton";
import type { AuthFormType } from "../../../types/auth.types";

interface Props {
    handleChangeForm: (type: AuthFormType) => void;
    handleUpdateEmail: (email: string) => void;
};

const Register = ({ handleChangeForm, handleUpdateEmail }: Props) => {
    const [user, setUser] = useState({
        company: "",
        email: "",
        name: "",
        password: ""
    });

    const { errors, handleValidateSchema } = useSchemaValidator(validationSchemas.auth.register, user);

    const { isPending, mutate } = useMutation({
        mutationFn: async (values: typeof user) => {
            const { data } = await API.post("/auth/register", values);
            return data;
        },
        onError: (error) => toast.error(error?.errorMessage),
        onSuccess: (_, values) => {
            handleUpdateEmail(values?.email);
            handleChangeForm("register-confirm");

            toast.info("A verification code has been sent to your email. Please verify your account within 5 minutes.");
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
                label="Your Name"
                error={errors?.name}
                autoComplete="name"
                placeholder="Enter your name"
                required
                maxLength={250}
                value={user?.name}
                onChange={e => setUser(prev => ({ ...prev, name: e.target.value }))}
            />

            <TextInput
                label="Email Address"
                error={errors?.email}
                autoComplete="email"
                placeholder={`e.g. ${APP.SUPPORT_MAIL}`}
                required
                value={user?.email}
                type="email"
                onChange={e => setUser(prev => ({ ...prev, email: e.target.value }))}
            />

            <TextInput
                label="Company Name"
                error={errors?.company}
                placeholder={`e.g. ${APP.APP_NAME}`}
                autoComplete="organization"
                required
                maxLength={500}
                value={user?.company}
                onChange={e => setUser(prev => ({ ...prev, company: e.target.value }))}
            />

            <PasswordInput
                label="Password"
                error={errors?.password}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                value={user?.password}
                onChange={e => setUser(prev => ({ ...prev, password: e.target.value }))}
            />

            <AuthButton isPending={isPending} text="Create my account" />

        </form>
    );
};

export default Register;