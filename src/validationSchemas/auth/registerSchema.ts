import { z } from "zod";
import passwordSchema from "../common/passwordSchema";
import emailSchema from "../common/emailSchema";
import nameSchema from "../common/nameSchema";
import companySchema from "../common/companySchema";

const registerSchema = z.object({
    company: companySchema,
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema
});

export default registerSchema;