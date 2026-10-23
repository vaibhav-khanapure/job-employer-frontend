export type AuthFormType =
    | "login"
    | "register"
    | "forgot"
    | "verify"
    | "reset";

export interface AuthFormTitle {
    type: AuthFormType;
    title: string;
    subtitle: string;
};