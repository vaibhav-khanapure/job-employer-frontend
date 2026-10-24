import { useState } from "react";
import type { ZodType } from "zod";
import schemaValidator from "../utils/validators/schemaValidator";

const useSchemaValidator = <T>(schema: ZodType<T>, values: unknown) => {
    const [errors, setErrors] = useState<Record<string, string> | null>(null);

    const handleValidateSchema = () => {
        const { success, data, errors } = schemaValidator(schema, values);

        if (!success && errors) {
            setErrors(errors);
        };

        return { success, data }
    };

    return { errors, handleValidateSchema };
};

export default useSchemaValidator;