import forgotPasswordSchema from "./forgotPasswordSchema";
import loginSchema from "./loginSchema";
import registerConfirmSchema from "./registerConfirmSchema";
import registerSchema from "./registerSchema";

const authSchemas = {
    forgotPassword: forgotPasswordSchema,
    login: loginSchema,
    register: registerSchema,
    registerConfirm: registerConfirmSchema,
};

export default authSchemas;