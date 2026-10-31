import { Fragment, type SubmitEvent, useState } from "react";
import type { AuthFormType } from "../../../types/auth.types";
import useSchemaValidator from "@/src/hooks/useSchemaValidator";
import validationSchemas from "@/src/validationSchemas/validationSchema";
import { useMutation } from "@tanstack/react-query";
import API from "@/src/lib/API";
import toast from "@/src/lib/toast";
import TextInput from "@/src/components/common/inputs/TextInput";
import PasswordInput from "@/src/components/common/inputs/PasswordInput";
import APP from "@/src/constants/app";
import GoogleSignInButton from "../components/GoogleSignInButton";
import Loaders from "@/src/components/common/loaders/loaders";

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
                placeholder="you@gmail.com"
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

            <button type="submit" className="btn" disabled={isPending}>
                {isPending ? <Loaders.Spinner className="size-2" /> : (
                    <Fragment>
                        Create my account &nbsp;
                        <span aria-hidden="true"> →</span>
                    </Fragment>
                )}
            </button>

            <div className="flex items-center gap-4 -my-1">
                <hr className="flex-1 border-0 border-t border-gray-200" />
                <span className="text-sm tracking-wider text-gray-400">
                    or
                </span>
                <hr className="flex-1 border-0 border-t border-gray-200" />
            </div>

            <GoogleSignInButton />

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

export default Register;