import forgotPasswordSchema from "./forgotPasswordSchema";
import googleAuthRegisterSchema from "./googleAuthRegisterSchema";
import loginSchema from "./loginSchema";
import registerConfirmSchema from "./registerConfirmSchema";
import registerSchema from "./registerSchema";
import resetPasswordSchema from "./resetPasswordSchema";

const authSchemas = {
    forgotPassword: forgotPasswordSchema,
    googleAuthRegister: googleAuthRegisterSchema,
    login: loginSchema,
    register: registerSchema,
    registerConfirm: registerConfirmSchema,
    resetPassword: resetPasswordSchema
};

export default authSchemas;