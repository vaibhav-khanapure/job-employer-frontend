import apiSchemas from "./api/apiSchemas";
import authSchemas from "./auth/authSchemas";

const validationSchemas = {
    api: apiSchemas,

    // Client
    auth: authSchemas,
};

export default validationSchemas;