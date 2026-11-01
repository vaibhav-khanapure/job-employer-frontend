"use client";

import { Fragment, type ReactNode } from "react";

interface Props {
    children: ReactNode;
};

const VerifyAuthProvider = ({ children }: Props) => {
    return (
        <Fragment>{children}</Fragment>
    );
};

export default VerifyAuthProvider;