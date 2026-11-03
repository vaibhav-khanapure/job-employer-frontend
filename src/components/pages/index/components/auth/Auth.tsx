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
import GoogleRegisterModal from "./components/GoogleRegisterModal";
import useAuthStore from "@/src/store/authStore";
import AuthDivider from "./components/AuthDivider";
import GoogleSignInButton from "./components/GoogleSignInButton";
import AuthFormFooter from "./components/AuthFormFooter";
import authFormFooterOptions from "../../data/authFormFooterOptions";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [formType, setFormType] = useState<AuthFormType>("login");

    const showGoogleRegisterModal = useAuthStore(state => state?.showGoogleRegisterModal)

    const formTitle = authFormTitles.find(form => form.type === formType);
    const currentForm = authFormFooterOptions.find(opt => opt?.type === formType);

    const handleChangeForm = (type: AuthFormType) => {
        if (type === "login") setEmail("");
        setFormType(type);
    };

    return (
        <div className="p-6 py-8 max-w-100 rounded-lg shadow-sm">

            {["forgot-password", "register-confirm"].includes(formType) && (
                <div
                    className="size-10 rounded-full cursor-pointer grid place-items-center hover:bg-bg-secondary"
                    onClick={() => setFormType("login")}
                >
                    <IoMdArrowBack size={20} />
                </div>
            )}

            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold tracking-tight mb-2 text-text-primary">{formTitle?.title}</h1>
                <p className="text-sm text-text-tertiary">{formTitle?.subtitle}</p>
            </div>

            {formType === "login" && <Login handleChangeForm={handleChangeForm} />}

            {formType === "register" && (
                <Register
                    handleChangeForm={handleChangeForm}
                    handleUpdateEmail={(email: string) => setEmail(email)}
                />
            )}

            {formType === "register-confirm" && <RegisterConfirm email={email} />}

            {formType === "forgot-password" && (
                <ForgotPassword
                    handleChangeForm={handleChangeForm}
                    handleUpdateEmail={(email: string) => setEmail(email)}
                />
            )}

            {formType === "reset-password" && <ResetPassword email={email} handleChangeForm={handleChangeForm} />}

            <div className="space-y-4 mt-4">
                {["login", "register"].includes(formType) && <AuthDivider />}

                {["login", "register"].includes(formType) && <GoogleSignInButton />}

                {currentForm && (
                    <AuthFormFooter
                        handleChangeForm={handleChangeForm}
                        info={currentForm?.info}
                        link={currentForm?.link as AuthFormType}
                        linkText={currentForm?.linkText}
                    />
                )}
            </div>

            {showGoogleRegisterModal && <GoogleRegisterModal />}
        </div>
    );
};

export default Auth;