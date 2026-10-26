import 'server-only';
import { z } from 'zod';

const serverEnvSchema = z.object({
    API_URL: z.url(),
    APP_ENV: z.enum(["local", "development", "testing", "staging", "live"]),
    GOOGLE_AUTH_CLIENT_ID: z.string().min(1),
    GOOGLE_AUTH_SECRET_ID: z.string().min(1),
    NEXTAUTH_URL: z.url(),
    NEXTAUTH_SECRET: z.string().min(1),
    PORT: z.coerce.number().int().positive().default(4000),
});

const result = serverEnvSchema.safeParse(process.env);

if (!result.success) {
    throw new Error(
        `Invalid server environment variables:\n${z.prettifyError(result.error)}`
    );
};

const SERVER_ENV = {
    API_URL: result.data.API_URL,
    APP_ENV: result.data.APP_ENV,
    GOOGLE_AUTH_CLIENT_ID: result.data.GOOGLE_AUTH_CLIENT_ID,
    GOOGLE_AUTH_SECRET_ID: result.data.GOOGLE_AUTH_SECRET_ID,
    NEXTAUTH_URL: result.data.NEXTAUTH_URL,
    NEXTAUTH_SECRET: result.data.NEXTAUTH_SECRET,
    PORT: result.data.PORT,
};

export default SERVER_ENV;