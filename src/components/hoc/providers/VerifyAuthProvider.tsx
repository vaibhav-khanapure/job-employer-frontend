"use client";

import authAPIAction from "@/src/actions/auth/authAPIAction";
import pageLoader from "@/src/actions/loaders/pageLoader";
import BROWSER_STORAGE from "@/src/constants/browserStorage";
import CLIENT_ENV from "@/src/constants/env/clientEnv";
import toast from "@/src/lib/toast";
import useAuthStore from "@/src/store/authStore";
import useUserStore from "@/src/store/userStore";
import handleLogout from "@/src/utils/auth/handleLogout";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
    children: ReactNode;
};

const VerifyAuthProvider = ({ children }: Props) => {
    const [isLoading, setIsLoading] = useState(true);

    const hasVerified = useRef(false);
    const { replace } = useRouter();
    const pathname = usePathname();

    const { mutate } = useMutation({
        mutationFn: () => authAPIAction("/verify", {}),
        onSettled: () => {
            pageLoader.close();
            setIsLoading(false);
        },
        onError: (error) => {
            localStorage.removeItem(BROWSER_STORAGE.LOCAL.USER_SIGNED_IN);

            if (pathname !== "/") handleLogout({ replace });

            toast.error(CLIENT_ENV.APP_ENV !== "live" ? error?.errorMessage : "Session expired, please sign in again");
        },
        onSuccess: (result) => {
            const { accessToken, email, name, role } = result?.data;

            useAuthStore.setState({
                accessToken,
                isAuth: true,
                shouldRegenerateAccessToken: true
            });

            useUserStore.setState({
                user: {
                    email,
                    name,
                    role
                }
            });

            localStorage.setItem(BROWSER_STORAGE.LOCAL.USER_SIGNED_IN, '1');

            if (pathname === "/") replace("/home");
        }
    });

    useEffect(() => {
        const handleVerifyAuth = () => {
            if (hasVerified.current) return;

            hasVerified.current = true;

            const isLoggedIn = localStorage.getItem(BROWSER_STORAGE.LOCAL.USER_SIGNED_IN);

            if (!isLoggedIn) {
                setIsLoading(false);
                return;
            };

            pageLoader.show("Verifying user");

            mutate();
        };

        handleVerifyAuth();
    }, []);

    return (
        <Fragment>
            {!isLoading && children}
        </Fragment>
    );
};

export default VerifyAuthProvider;