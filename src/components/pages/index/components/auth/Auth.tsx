"use client";

import { useState } from "react";
import authFormTitles from "../../data/authFormTitles";
import type { AuthFormType } from "../../types/auth.types";
import Login from "./forms/Login";
import Register from "./forms/Register";
import RegisterConfirm from "./forms/RegisterConfirm";
import ForgotPassword from "./forms/ForgotPassword";
import ResetPassword from "./forms/ResetPassword";
import { IoMdArrowBack } from "react-icons/io";
import CompanyNameModal from "./components/CompanyNameModal";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [formType, setFormType] = useState<AuthFormType>("login");
    const [showCompanyNameModal, setShowCompanyNameModal] = useState(true);

    const formTitle = authFormTitles.find(form => form.type === formType);

    const handleChangeForm = (type: AuthFormType) => {
        // setEmail("");
        setFormType(type);
    };

    return (
        <div className="p-6 py-8 max-w-100 rounded-lg shadow-sm">

            {formType === "forgot-password" && (
                <div
                    className="size-10 rounded-full cursor-pointer grid place-items-center hover:bg-gray-50"
                    onClick={() => setFormType("login")}
                >
                    <IoMdArrowBack size={20} />
                </div>
            )}

            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold tracking-tight mb-2">{formTitle?.title}</h1>
                <p className="text-sm text-zinc-600">{formTitle?.subtitle}</p>
            </div>

            {formType === "login" && <Login handleChangeForm={handleChangeForm} />}

            {formType === "register" && (
                <Register
                    handleChangeForm={handleChangeForm}
                    handleUpdateEmail={(email: string) => setEmail(email)}
                />
            )}

            {formType === "register-confirm" && <RegisterConfirm email={email} handleChangeForm={handleChangeForm} />}

            {formType === "forgot-password" && (
                <ForgotPassword
                    handleChangeForm={handleChangeForm}
                    handleUpdateEmail={(email: string) => setEmail(email)}
                />
            )}

            {formType === "reset-password" && <ResetPassword email={email} handleChangeForm={handleChangeForm} />}

            {showCompanyNameModal && <CompanyNameModal />}
        </div>
    );
};

export default Auth;