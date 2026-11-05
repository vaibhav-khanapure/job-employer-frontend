import { z } from "zod";
import companySchema from "../common/companySchema";

const googleAuthRegisterSchema = z.object({
    company: companySchema
});

export default googleAuthRegisterSchema;