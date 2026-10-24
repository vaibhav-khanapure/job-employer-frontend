import { z } from "zod";
import emailSchema from "../common/emailSchema";

const forgotPasswordSchema = z.object({
    email: emailSchema
});

export default forgotPasswordSchema;