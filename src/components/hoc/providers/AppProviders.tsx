import { Fragment, type ReactNode } from "react";
import ReactQueryProvider from "./ReactQueryProvider";
import GoogleAuthProvider from "./GoogleAuthProvider";

interface Props {
    children: ReactNode;
};

const AppProviders = ({ children }: Props) => {
    return (
        <Fragment>
            <GoogleAuthProvider>
                <ReactQueryProvider>
                    {children}
                </ReactQueryProvider>
            </GoogleAuthProvider>
        </Fragment>
    );
};

export default AppProviders;