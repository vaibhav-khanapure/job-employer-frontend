import { type SubmitEvent, useState } from "react";
import GoogleSignInButton from "../components/GoogleSignInButton";
import type { AuthFormType } from "../../../types/auth.types";
import { useMutation } from "@tanstack/react-query";
import API from "@/src/lib/API";
import FormError from "@/src/components/common/errors/FormError";

interface Props {
    handleChangeForm: (type: AuthFormType) => void;
};

const Login = ({ handleChangeForm }: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const { error, isPending, mutate } = useMutation({
        mutationFn: (data) => API.post("/auth/login", data),
        // onError: () => 
        // onSuccess: 
    });

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isPending) return;

        
    };

    return (
        <form className="flex flex-col gap-5">

            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="label">Email Address</label>
                <input
                    autoComplete="email"
                    className="input"
                    id="email"
                    onChange={e => setUser(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="you@gmail.com"
                    required
                    value={user.email}
                    type="email"
                />
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="label">Password</label>
                    <span
                        className="label cursor-pointer text-gray-400 hover:text-primary hover:underline"
                        onClick={() => handleChangeForm("forgot")}
                    >
                        Forgot Password?
                    </span>
                </div>

                <div className="relative overflow-hidden">
                    <input
                        autoComplete="current-password"
                        className="input pr-20"
                        id="password"
                        onChange={e => setUser(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="Enter your password"
                        required
                        value={user.password}
                        type={showPassword ? "text" : "password"}
                    />

                    <button
                        type="button"
                        className="absolute inset-y-0 right-3 text-sm font-semibold text-gray-500 transition-colors hover:text-primary"
                        onClick={() => setShowPassword(prev => !prev)}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
            </div>

            {error && <FormError message={error?.message} />}

            <button type="submit" className="btn">
                Sign In
                <span aria-hidden="true"> →</span>
            </button>

            <div className="flex items-center gap-4">
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
                    onClick={() => handleChangeForm('register')}
                    className="label cursor-pointer underline text-gray-800 hover:text-primary"
                >
                    Create an account
                </span>
            </p>

        </form>
    );
};

export default Login;