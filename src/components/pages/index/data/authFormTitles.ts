import type { AuthFormTitle } from "../types/auth.types";

const authFormTitles: AuthFormTitle[] = [
    {
        type: "login",
        title: "Welcome back",
        subtitle: "Sign in to manage your hiring activities, review candidates, and grow your team.",
    },
    {
        type: "register",
        title: "Create your account",
        subtitle: "Set up your company profile and start connecting with qualified candidates.",
    },
    {
        type: "forgot-password",
        title: "Forgot your password?",
        subtitle: "Enter your registered email address and we'll send you a verification code to reset your password.",
    },
    {
        type: "register-confirm",
        title: "Verify your account",
        subtitle: "Enter the verification code sent to your email to verify your account and continue.",
    },
    {
        type: "reset-password",
        title: "Set a new password",
        subtitle: "Choose a strong password to keep your employer account secure.",
    },
];

export default authFormTitles;