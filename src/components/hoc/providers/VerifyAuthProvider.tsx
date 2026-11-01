"use client";

import authAPIAction from "@/src/actions/auth/authAPIAction";
import pageLoader from "@/src/actions/loaders/pageLoader";
import BROWSER_STORAGE from "@/src/constants/browserStorage";
import CLIENT_ENV from "@/src/constants/env/clientEnv";
import toast from "@/src/lib/toast";
import useAuthStore from "@/src/store/authStore";
import useCompanyStore from "@/src/store/companyStore";
import useUserStore from "@/src/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, type ReactNode } from "react";

interface Props {
    children: ReactNode;
};

const VerifyAuthProvider = ({ children }: Props) => {
    const hasVerified = useRef(false);
    const { replace } = useRouter();

    const { mutate } = useMutation({
        mutationFn: () => authAPIAction("/verify", {}),
        onSettled: () => pageLoader.close(),
        onError: (error) => {
            localStorage.removeItem(BROWSER_STORAGE.LOCAL.USER_SIGNED_IN);

            toast.error(CLIENT_ENV.APP_ENV !== "live" ? error?.errorMessage : "Session expired, please sign in again");
        },
        onSuccess: (result) => {
            const { accessToken, company, companySlug, email, name, role } = result?.data;

            useAuthStore.setState({
                accessToken,
                isAuth: true,
                shouldRegenerateAccessToken: true
            });

            useCompanyStore.setState({
                company: {
                    name: company,
                    slug: companySlug
                }
            });

            useUserStore.setState({
                user: {
                    email,
                    name,
                    role
                }
            });

            localStorage.setItem(BROWSER_STORAGE.LOCAL.USER_SIGNED_IN, '1');

            // replace("/home");
        }
    });

    useEffect(() => {
        const handleVerifyAuth = () => {
            if (hasVerified.current) return;

            hasVerified.current = true;

            const isLoggedIn = localStorage.getItem(BROWSER_STORAGE.LOCAL.USER_SIGNED_IN);

            if (!isLoggedIn) return;

            pageLoader.show("Verifying user");

            mutate();
        };

        handleVerifyAuth();
    }, []);

    return (
        <Fragment>{children}</Fragment>
    );
};

export default VerifyAuthProvider;