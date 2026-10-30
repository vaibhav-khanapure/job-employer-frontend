import googleAuthSchema from "./auth/googleAuthSchema";
import registerConfirmSchema from "./auth/registerConfirmSchema";

const apiSchemas = {
    auth: {
        googleAuth: googleAuthSchema,
        registerConfirm: registerConfirmSchema
    }
};

export default apiSchemas;