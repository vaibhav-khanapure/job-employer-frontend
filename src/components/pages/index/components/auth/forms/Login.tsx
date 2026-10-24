import { Fragment, type SubmitEvent, useState } from "react";
import type { AuthFormType } from "../../../types/auth.types";
import { useMutation } from "@tanstack/react-query";
import API from "@/src/lib/API";
import FormError from "@/src/components/common/errors/FormError";
import toast from "@/src/lib/toast";
import useSchemaValidator from "@/src/hooks/useSchemaValidator";
import useAuthStore from "@/src/store/authStore";
import useUserStore from "@/src/store/userStore";
import { useRouter } from "next/navigation";
import TextInput from "@/src/components/common/inputs/TextInput";
import PasswordInput from "@/src/components/common/inputs/PasswordInput";
import Loaders from "@/src/components/common/loaders/loaders";
import validationSchemas from "@/src/validationSchemas/validationSchema";
import GoogleSignInButton from "../components/GoogleSignInButton";

interface Props {
    handleChangeForm: (type: AuthFormType) => void;
};

const Login = ({ handleChangeForm }: Props) => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const { replace } = useRouter();

    const { errors, handleValidateSchema } = useSchemaValidator(validationSchemas.auth.login, user);

    const { error, isPending, mutate } = useMutation({
        mutationFn: async (values: typeof user) => {
            const { data } = await API.post("/auth/login", values);
            return data;
        },
        onError: (error) => toast.error(error?.errorMessage),
        onSuccess: (data, values) => {
            const { accessToken, name } = data;

            if (!accessToken) {
                toast.error("Something went wrong, please try again");
                return;
            };

            useAuthStore.setState({
                accessToken,
                isAuth: true,
                shouldRegenerateAccessToken: true
            });

            useUserStore.setState({
                name,
                email: values?.email
            });

            localStorage.setItem('sha-log', '1');

            toast.success("Logged in successfully");

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

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

            <TextInput
                label="Email Address"
                error={errors?.email}
                autoComplete="email"
                placeholder="you@gmail.com"
                required
                value={user.email}
                type="email"
                onChange={e => setUser(prev => ({ ...prev, email: e.target.value }))}
            />

            <PasswordInput
                label="Password"
                error={errors?.password}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                value={user.password}
                onChange={e => setUser(prev => ({ ...prev, password: e.target.value }))}
                LabelRightComponent={() => (
                    <span
                        className="label cursor-pointer text-gray-400 hover:text-primary hover:underline"
                        onClick={() => handleChangeForm("forgot")}
                    >
                        Forgot Password?
                    </span>
                )}
            />

            {error && <FormError message={error?.message} />}

            <button type="submit" className="btn" disabled={isPending}>
                {isPending ? <Loaders.Spinner className="size-2" /> : (
                    <Fragment>
                        Sign In &nbsp;
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
                New here?{' '}
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

export default Login;