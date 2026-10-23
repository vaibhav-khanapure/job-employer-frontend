'use client';

import { useState } from "react";
import authFormTitles from "../../data/authFormTitles";
import type { AuthFormType } from "../../types/auth.types";
import Login from "./forms/Login";

const Auth = () => {
    const [formType, setFormType] = useState<AuthFormType>('login');
    const formTitle = authFormTitles.find(form => form.type === formType);

    return (
        <div className="p-6 py-8 max-w-100 rounded-lg shadow-sm">

            <div className="text-center mb-6">
                <h1 className="text-4xl font-bold tracking-tight mb-2">{formTitle?.title}</h1>
                <p className="text-zinc-600">{formTitle?.subtitle}</p>
            </div>

            {formType === 'login' && <Login handleChangeForm={(type: AuthFormType) => setFormType(type)} />}
        </div>
    );
};

export default Auth;