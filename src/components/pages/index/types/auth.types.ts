export type AuthFormType =
    | "login"
    | "register"
    | "register-confirm"
    | "forgot-password"
    | "reset-password";

export interface AuthFormTitle {
    type: AuthFormType;
    title: string;
    subtitle: string;
};