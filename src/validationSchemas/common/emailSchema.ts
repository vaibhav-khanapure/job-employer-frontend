import z from "zod";

const emailSchema = z
    .email({
        error: "Please enter a valid email address",
    })
    .trim()
    .toLowerCase();

export default emailSchema;