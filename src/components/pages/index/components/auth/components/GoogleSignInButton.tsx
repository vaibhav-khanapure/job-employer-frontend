"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import authAPIAction from "../../../actions/authAPIAction";
import toast from "@/src/lib/toast";
import useAuthStore from "@/src/store/authStore";
import useUserStore from "@/src/store/userStore";
import useCompanyStore from "@/src/store/companyStore";
import BROWSER_STORAGE from "@/src/constants/browserStorage";
import { useRouter } from "next/navigation";

const GoogleSignInButton = () => {
    const [loading, setLoading] = useState(false);

    const { replace } = useRouter();

    const handleLogin = useGoogleLogin({
        flow: "auth-code",
        onSuccess: async ({ code }) => {
            try {
                setLoading(true);

                const { data, status } = await authAPIAction("/google", {
                    data: { code }
                });

                if (status === 204) {
                    useAuthStore.setState({ showGoogleRegisterModal: true });
                };

                if (status === 200) {
                    const { accessToken, company, companySlug, email, name, role } = data;

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

                    toast.success("Sign in successfully");

                    replace("/home");
                };
            } catch (error) {
                console.log('errororoorror', error);

                if (typeof error === 'object' && error !== null && 'errorMessage' in error) {
                    toast.error(String(error?.errorMessage));
                } else {
                    toast.error('Something went wrong, please try again');
                };
            } finally {
                setLoading(false);
            };
        },
        onError: () => {
            setLoading(false);
            toast.error("Google sign-in was unsuccessful");
        },
        onNonOAuthError: () => {
            setLoading(false);
        },
    });

    const { isPending, mutate } = useMutation({
        mutationFn: () => authAPIAction("/google/initiate", {}),
        onError: (error) => toast.error(error?.errorMessage),
        onSuccess: () => handleLogin()
    });

    return (
        <button
            type="button"
            disabled={isPending || loading}
            onClick={() => mutate()}
            className="w-full flex items-center justify-center gap-3 rounded-md
                       border border-gray-300 bg-white px-4 py-2.5
                       font-medium text-gray-700 transition
                       hover:bg-gray-50 disabled:cursor-not-allowed
                       disabled:opacity-60"
        >
            {isPending ? "Initiating" : loading ? "Signing in..." : (
                <Fragment>
                    <FaGoogle />
                    <span>Continue with Google</span>
                </Fragment>
            )}
        </button>
    );
};

export default GoogleSignInButton;