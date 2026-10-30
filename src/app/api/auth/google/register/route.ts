import serverAPI from "@/src/lib/serverAPI";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest, } from "next/server";
import { type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import COOKIES from "@/src/constants/cookies";
import schemaValidator from "@/src/utils/validators/schemaValidator";
import validationSchemas from "@/src/validationSchemas/validationSchema";

export async function POST(request: NextRequest) {
    let cookieStore: ReadonlyRequestCookies | null = null;

    try {
        const body = await request.json();

        const { success, data: values, errors } = schemaValidator(validationSchemas.api.auth.googleAuthRegister, body);

        if (!success) {
            return NextResponse.json(
                { message: Object.values(errors ?? {})?.[0] ?? "Invalid input" },
                { status: 400 }
            );
        };

        const clientIp =
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            request.headers.get("x-real-ip");

        if (!clientIp) {
            return NextResponse.json({ message: "Invalid client source" }, { status: 400 });
        };

        cookieStore = await cookies();

        const googleCode = cookieStore.get(COOKIES.AUTH.GOOGLE_TEMPORARY_CODE);

        if (!googleCode) {
            return NextResponse.json({ message: "Session expired" }, { status: 400 });
        };

        const userAgent = request.headers.get("user-agent");

        const { data, status } = await serverAPI.post(
            "/auth/google/register",
            {
                code: googleCode?.value,
                comapnyName: values?.company
            },
            {
                headers: {
                    "x-client-ip": clientIp,
                    "x-client-user-agent": userAgent,
                }
            }
        );

        const { name, role, accessToken, refreshToken } = data;

        cookieStore.delete(COOKIES.AUTH.GOOGLE_TEMPORARY_CODE);

        cookieStore.set(COOKIES.AUTH.REFRESH_TOKEN, refreshToken, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });

        return NextResponse.json({ accessToken, role, name }, { status });
    } catch (error) {
        if (cookieStore) {
            cookieStore.delete(COOKIES.AUTH.GOOGLE_TEMPORARY_CODE);
        };

        return NextResponse.json({ message: "Server error occurred" }, { status: 500 });
    };
};