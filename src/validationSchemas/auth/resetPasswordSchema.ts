import { z } from "zod";
import passwordSchema from "../common/passwordSchema";
import emailSchema from "../common/emailSchema";

const resetPasswordSchema = z
    .object({
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: passwordSchema,
        code: z
            .string()
            .length(6, {
                error: "Code must be exactly 6 characters",
            })
            .toUpperCase()
            .regex(/^[A-Z0-9]{6}$/, {
                error: "Code must contain only uppercase letters and numbers",
            }),
    })
    .refine(data => data.password === data.confirmPassword, {
        error: "Passwords do not match",
        path: ["confirmPassword"],
    })
    .transform(({ confirmPassword, ...data }) => data);

export default resetPasswordSchema;