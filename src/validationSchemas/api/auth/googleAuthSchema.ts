import z from 'zod';

const googleAuthSchema = z.object({
    code: z
        .string({
            error: 'All fields are reuqired',
        })
        .trim()
});

export default googleAuthSchema;