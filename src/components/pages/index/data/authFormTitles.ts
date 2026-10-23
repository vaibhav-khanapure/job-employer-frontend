import type { AuthFormTitle } from "../types/auth.types";

const authFormTitles: AuthFormTitle[] = [
    {
        type: "login",
        title: "Sign in",
        subtitle: "Sign in to continue exploring jobs and manage your applications.",
    },
    {
        type: "register",
        title: "Create your account",
        subtitle: "Join us to discover jobs, apply with ease, and track your career journey.",
    },
    {
        type: "forgot",
        title: "Forgot your password?",
        subtitle: "Enter your email address and we'll send you a verification code to reset your password.",
    },
    {
        type: "verify",
        title: "Verify your email",
        subtitle: "Enter the verification code we sent to your email to continue.",
    },
    {
        type: "reset",
        title: "Create new password",
        subtitle: "Choose a strong password to secure your account and regain access.",
    },
];

export default authFormTitles;