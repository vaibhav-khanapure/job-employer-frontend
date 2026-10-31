import { z } from "zod";
import companySchema from "../common/companySchema";

const forgotPasswordSchema = z.object({
    company: companySchema
});

export default forgotPasswordSchema;