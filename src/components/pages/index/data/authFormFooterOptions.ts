const authFormFooterOptions = [
    {
        type: "login",
        info: "New here?",
        link: "register",
        linkText: "Create account"
    },
    {
        type: "register",
        info: "Already have an account?",
        link: "login",
        linkText: "Sign in"
    },
    {
        type: "register-confirm",
        info: "Already have an account?",
        link: "login",
        linkText: "Sign in"
    },
    {
        type: "forgot-password",
        info: "Don't have an account?",
        link: "register",
        linkText: "Create account"
    },
    {
        type: "reset-password",
        info: "Remembered your password?",
        link: "login",
        linkText: "Sign in"
    },
];

export default authFormFooterOptions;