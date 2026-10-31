import googleAuthRegisterSchema from "./auth/googleAuthRegisterSchema";
import googleAuthSchema from "./auth/googleAuthSchema";
import loginSchema from "./auth/loginSchema";
import registerConfirmSchema from "./auth/registerConfirmSchema";

const apiSchemas = {
    auth: {
        googleAuth: googleAuthSchema,
        googleAuthRegister: googleAuthRegisterSchema,
        login: loginSchema,
        registerConfirm: registerConfirmSchema
    }
};

export default apiSchemas;