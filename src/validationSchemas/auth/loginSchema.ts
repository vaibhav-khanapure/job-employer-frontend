import { z } from "zod";
import passwordSchema from "../common/passwordSchema";
import emailSchema from "../common/emailSchema";

const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema
});

export default loginSchema;