import { type SubmitEvent, useState } from "react";
import type { AuthFormType } from "../../../types/auth.types";
import { useMutation } from "@tanstack/react-query";
import toast from "@/src/lib/toast";
import useSchemaValidator from "@/src/hooks/validators/useSchemaValidator";
import useAuthStore from "@/src/store/authStore";
import useUserStore from "@/src/store/userStore";
import { useRouter } from "next/navigation";
import TextInput from "@/src/components/common/inputs/TextInput";
import PasswordInput from "@/src/components/common/inputs/PasswordInput";
import validationSchemas from "@/src/validationSchemas/validationSchema";
import useCompanyStore from "@/src/store/companyStore";
import BROWSER_STORAGE from "@/src/constants/browserStorage";
import authAPIAction from "@/src/actions/auth/authAPIAction";
import AuthButton from "../components/AuthButton";

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

    const { isPending, mutate } = useMutation({
        mutationFn: async (data: typeof user) => {
            const result = await authAPIAction("/login", { data });
            return result;
        },
        onError: (error) => toast.error(error?.errorMessage),
        onSuccess: (res) => {
            const { accessToken, company, companySlug, email, name, role } = res?.data;

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
                user: {
                    name,
                    email,
                    role
                }
            });

            useCompanyStore.setState({
                company: {
                    name: company,
                    slug: companySlug
                }
            });

            localStorage.setItem(BROWSER_STORAGE.LOCAL.USER_SIGNED_IN, '1');

            toast.success("Signed in successfully");

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
                value={user?.email}
                type="email"
                onChange={e => setUser(prev => ({ ...prev, email: e.target.value }))}
            />

            <PasswordInput
                label="Password"
                error={errors?.password}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                value={user?.password}
                onChange={e => setUser(prev => ({ ...prev, password: e.target.value }))}
                LabelRightComponent={() => (
                    <span
                        className="label cursor-pointer text-text-muted hover:text-text-primary hover:underline"
                        onClick={() => handleChangeForm("forgot-password")}
                    >
                        Forgot Password?
                    </span>
                )}
            />

            <AuthButton isPending={isPending} text="Sign In" />

        </form>
    );
};

export default Login;