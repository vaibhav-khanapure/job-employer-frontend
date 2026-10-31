import { z } from "zod";
import emailSchema from "../../common/emailSchema";
import passwordSchema from "../../common/passwordSchema";

const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema
});

export default loginSchema;