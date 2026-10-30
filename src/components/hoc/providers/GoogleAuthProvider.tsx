"use client";

import CLIENT_ENV from "@/src/constants/env/clientEnv";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
};

const GoogleAuthProvider = ({ children }: Props) => {
    return (
        <GoogleOAuthProvider clientId={CLIENT_ENV.GOOGLE_CLIENT_ID}>
            {children}
        </GoogleOAuthProvider>
    );
};

export default GoogleAuthProvider;