import { z } from "zod";
import emailSchema from "../common/emailSchema";

const registerConfirmSchema = z.object({
    email: emailSchema,
    code: z
        .string()
        .length(6, {
            error: "Verification code must be exactly 6 characters",
        })
        .toUpperCase()
        .regex(/^[A-Z0-9]{6}$/, {
            error: "Verification code must contain only uppercase letters and numbers",
        })
});

export default registerConfirmSchema;