import z from "zod";

const companySchema = z
    .string()
    .trim()
    .min(1, {
        error: "Company name must be at least 1 character long",
    })
    .max(500, {
        error: "Company name must not exceed 500 characters",
    })
    .regex(/^[\p{L}\p{M}\p{N}][\p{L}\p{M}\p{N}\s&.,'’()\-\/]*$/u, {
        error: "Please enter a valid company name",
    });

export default companySchema;