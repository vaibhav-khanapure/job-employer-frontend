import { Fragment, type ReactNode } from "react";
import ReactQueryProvider from "./ReactQueryProvider";
import GoogleAuthProvider from "./GoogleAuthProvider";
import VerifyAuthProvider from "./VerifyAuthProvider";

interface Props {
    children: ReactNode;
};

const AppProviders = ({ children }: Props) => {
    return (
        <Fragment>
            <GoogleAuthProvider>
                <ReactQueryProvider>
                    <VerifyAuthProvider>
                        {children}
                    </VerifyAuthProvider>
                </ReactQueryProvider>
            </GoogleAuthProvider>
        </Fragment>
    );
};

export default AppProviders;