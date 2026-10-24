import loginSchema from "./loginSchema";
import registerConfirmSchema from "./registerConfirmSchema";
import registerSchema from "./registerSchema";

const authSchemas = {
    login: loginSchema,
    register: registerSchema,
    reisterConfirm: registerConfirmSchema,
};

export default authSchemas;