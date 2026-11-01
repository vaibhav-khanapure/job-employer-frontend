"use client";

import { useMutation } from "@tanstack/react-query";
import { Fragment, type ReactNode } from "react";

interface Props {
    children: ReactNode;
};

const VerifyAuthProvider = ({ children }: Props) => {
    // const {} = useMutation();

    return (
        <Fragment>{children}</Fragment>
    );
};

export default VerifyAuthProvider;