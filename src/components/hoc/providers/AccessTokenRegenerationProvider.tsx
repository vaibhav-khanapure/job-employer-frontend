"use client";

import authAPIAction from "@/src/actions/auth/authAPIAction";
import pageLoader from "@/src/actions/loaders/pageLoader";
import toast from "@/src/lib/toast";
import useAuthStore from "@/src/store/authStore";
import handleLogout from "@/src/utils/auth/handleLogout";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, type ReactNode } from "react";

interface Props {
    children: ReactNode;
};

const AccessTokenRegenerationProvider = ({ children }: Props) => {
    const shouldRegenerateAccessToken = useAuthStore(state => state?.shouldRegenerateAccessToken);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const { replace } = useRouter();

    const { mutate } = useMutation({
        mutationFn: () => authAPIAction("/regenerate-access", {}),
        onSuccess: (result) => {
            const accessToken = result?.data?.accessToken;

            if (!accessToken) {
                handleLogout({ replace, revokeSession: true });
            } else {
                useAuthStore.setState({ accessToken });
            };
        },
        onError: () => {
            pageLoader.show();
            handleLogout({ replace, revokeSession: true });
            toast.error("Session expired, please sign in again");
        },
        onSettled: () => pageLoader.close()
    });

    useEffect(() => {
        if (!shouldRegenerateAccessToken && intervalRef?.current) {
            clearInterval(intervalRef?.current);
        };

        if (shouldRegenerateAccessToken && !intervalRef?.current) {
            intervalRef.current = setInterval(() => mutate(), (1000 * 60 * 4) + (1000 * 45));
        };

        return () => {
            if (intervalRef?.current) clearInterval(intervalRef?.current);
        };

    }, [shouldRegenerateAccessToken]);

    return (
        <Fragment>
            {children}
        </Fragment>
    );
};

export default AccessTokenRegenerationProvider;