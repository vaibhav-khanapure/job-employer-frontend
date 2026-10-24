import z from "zod";

const clientEnvSchema = z.object({
    NEXT_PUBLIC_API_URL: z.url(),
    NEXT_PUBLIC_HIRE_SITE_URL: z.url(),
    NEXT_PUBLIC_SERVER_URL: z.url(),
});

const result = clientEnvSchema.safeParse(process.env);

if (!result?.success) {
    throw new Error(`Invalid client environment variables:\n${z.prettifyError(result.error)}`);
};

const clientEnv = {
    API_URL: result.data.NEXT_PUBLIC_API_URL,
    HIRE_SITE_URL: result.data.NEXT_PUBLIC_HIRE_SITE_URL,
    SERVER_URL: result.data.NEXT_PUBLIC_SERVER_URL,
};

export default clientEnv;