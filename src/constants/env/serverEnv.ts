import 'server-only';
import { z } from 'zod';

const serverEnvSchema = z.object({
    GOOGLE_AUTH_CLIENT_ID: z.string().min(1),
    GOOGLE_AUTH_SECRET_ID: z.string().min(1),
    NEXTAUTH_URL: z.url(),
    NEXTAUTH_SECRET: z.string().min(1),
    NEXT_SERVER_API_URL: z.url(),
    PORT: z.coerce.number().int().positive().default(4000),
});

const result = serverEnvSchema.safeParse(process.env);

if (!result.success) {
    throw new Error(
        `Invalid server environment variables:\n${z.prettifyError(result.error)}`
    );
};

const serverEnv = {
    GOOGLE_AUTH_CLIENT_ID: result.data.GOOGLE_AUTH_CLIENT_ID,
    GOOGLE_AUTH_SECRET_ID: result.data.GOOGLE_AUTH_SECRET_ID,
    NEXTAUTH_URL: result.data.NEXTAUTH_URL,
    NEXTAUTH_SECRET: result.data.NEXTAUTH_SECRET,
    SERVER_API_URL: result.data.NEXT_SERVER_API_URL,
    PORT: result.data.PORT,
};

export default serverEnv;