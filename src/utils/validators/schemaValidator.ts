import { type ZodSchema, ZodError } from "zod/v3";

const schemaValidator = <T>(schema: ZodSchema<T>, data: unknown) => {
    try {
        const result = schema.parse(data);

        return { success: true, data: result };
    } catch (error) {
        if (error instanceof ZodError) {
            const errors: Record<string, string> = {};

            for (const issue of error?.issues) {
                const field = issue.path.join(".");

                if (!errors[field]) errors[field] = issue.message;
            };

            return { success: false, errors };
        };

        return {
            success: false as const,
            errors: {
                general: "Some error occurred",
            },
        };
    };
};

export default schemaValidator;