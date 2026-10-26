import forgotPasswordSchema from "./forgotPasswordSchema";
import loginSchema from "./loginSchema";
import registerConfirmSchema from "./registerConfirmSchema";
import registerSchema from "./registerSchema";
import resetPasswordSchema from "./resetPasswordSchema";

const authSchemas = {
    forgotPassword: forgotPasswordSchema,
    login: loginSchema,
    register: registerSchema,
    registerConfirm: registerConfirmSchema,
    resetPassword: resetPasswordSchema
};

export default authSchemas;