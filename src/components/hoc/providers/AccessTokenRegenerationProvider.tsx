import { Fragment, type ReactNode } from "react";

interface Props {
    children: ReactNode;
};

const AccessTokenRegenerationProvider = ({ children }: Props) => {
    

    return (
        <Fragment>
            {children}
        </Fragment>
    );
};

export default AccessTokenRegenerationProvider;