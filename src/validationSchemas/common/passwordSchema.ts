import z from "zod";

const passwordSchema = z
    .string({
        error: "Password is required",
    })
    .min(8, {
        error: "Password must be at least 8 characters",
    })
    .max(30, {
        error: "Password must not exceed 30 characters",
    })
    .regex(/[A-Z]/, {
        error: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
        error: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
        error: "Password must contain at least one number",
    })
    .regex(/[^A-Za-z0-9]/, {
        error: "Password must contain at least one special character",
    });

export default passwordSchema;