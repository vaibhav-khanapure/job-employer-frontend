import googleAuthRegisterSchema from "./auth/googleAuthRegisterSchema";
import googleAuthSchema from "./auth/googleAuthSchema";
import registerConfirmSchema from "./auth/registerConfirmSchema";

const apiSchemas = {
    auth: {
        googleAuth: googleAuthSchema,
        googleAuthRegister: googleAuthRegisterSchema,
        registerConfirm: registerConfirmSchema
    }
};

export default apiSchemas;