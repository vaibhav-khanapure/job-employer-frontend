'use client';

import { useState } from "react";
import authFormTitles from "../../data/authFormTitles";
import type { AuthFormType } from "../../types/auth.types";
import Login from "./forms/Login";
import Register from "./forms/Register";
import RegisterConfirm from "./forms/RegisterConfirm";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [formType, setFormType] = useState<AuthFormType>("verify");

    const formTitle = authFormTitles.find(form => form.type === formType);

    const handleChangeForm = (type: AuthFormType) => {
        setEmail("");
        setFormType(type);
    };

    return (
        <div className="p-6 py-8 max-w-100 rounded-lg shadow-sm">

            <div className="text-center mb-6">
                <h1 className="text-4xl font-bold tracking-tight mb-2">{formTitle?.title}</h1>
                <p className="text-zinc-600">{formTitle?.subtitle}</p>
            </div>

            {formType === "login" && <Login handleChangeForm={handleChangeForm} />}

            {formType === "register" && (
                <Register
                    handleChangeForm={handleChangeForm}
                    handleUpdateEmail={(email: string) => setEmail(email)}
                />
            )}

            {formType === "verify" && <RegisterConfirm email={email} handleChangeForm={handleChangeForm} />}

        </div>
    );
};

export default Auth;