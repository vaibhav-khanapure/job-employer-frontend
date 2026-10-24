import z from "zod";

const nameSchema = z
    .string()
    .trim()
    .min(3, {
        error: "Name must be at least 3 characters long",
    })
    .max(50, {
        error: "Name must not exceed 50 characters",
    })
    .regex(/^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u, {
        error: "Please enter a valid name",
    });

export default nameSchema;