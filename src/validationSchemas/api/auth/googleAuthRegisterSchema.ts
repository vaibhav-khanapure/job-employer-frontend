import { z } from "zod";

const googleAuthRegisterSchema = z.object({
    company: z
        .string({
            error: "All fields are required",
        })
        .trim()
        .min(1, { error: "Company name is required" })
        .max(500, { error: "Company name must not exceed 500 characters" }),
});

export default googleAuthRegisterSchema;