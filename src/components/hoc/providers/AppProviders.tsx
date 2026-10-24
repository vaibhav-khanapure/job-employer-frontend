import { Fragment, type ReactNode } from "react";
import ReactQueryProvider from "./ReactQueryProvider";

interface Props {
    children: ReactNode;
};

const AppProviders = ({ children }: Props) => {
    return (
        <Fragment>
            <ReactQueryProvider>
                {children}
            </ReactQueryProvider>
        </Fragment>
    );
};

export default AppProviders;