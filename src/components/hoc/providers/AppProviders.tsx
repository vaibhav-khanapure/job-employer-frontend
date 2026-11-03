import { type ReactNode } from "react";
import ReactQueryProvider from "./ReactQueryProvider";
import GoogleAuthProvider from "./GoogleAuthProvider";
import VerifyAuthProvider from "./VerifyAuthProvider";
import AccessTokenRegenerationProvider from "./AccessTokenRegenerationProvider";

interface Props {
    children: ReactNode;
};

const AppProviders = ({ children }: Props) => {
    return (
        <GoogleAuthProvider>
            <ReactQueryProvider>
                <AccessTokenRegenerationProvider>
                    <VerifyAuthProvider>
                        {children}
                    </VerifyAuthProvider>
                </AccessTokenRegenerationProvider>
            </ReactQueryProvider>
        </GoogleAuthProvider>
    );
};

export default AppProviders;