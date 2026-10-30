import COOKIES from "@/src/constants/cookies";
import serverAPI from "@/src/lib/serverAPI";
import schemaValidator from "@/src/utils/validators/schemaValidator";
import validationSchemas from "@/src/validationSchemas/validationSchema";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { success, data: values, errors } = schemaValidator(validationSchemas.auth.login, body);

        if (!success) {
            return NextResponse.json(
                { message: Object.values(errors ?? {})?.[0] ?? "Invalid input" },
                { status: 400 }
            );
        };

        const clientIp =
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            request.headers.get("x-real-ip");

        const userAgent = request.headers.get("user-agent");

        const { data, status } = await serverAPI.post(
            "/auth/login",
            values,
            {
                headers: {
                    "x-client-ip": clientIp,
                    "x-client-user-agent": userAgent,
                }
            }
        );

        const { name, role, accessToken, refreshToken } = data;

        if (!accessToken || !refreshToken) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
        };

        const cookieStore = await cookies();

        cookieStore.set(COOKIES.AUTH.REFRESH_TOKEN, refreshToken, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });

        return NextResponse.json({ accessToken, role, name }, { status });
    } catch (error) {
        return NextResponse.json({ message: "Server error occurred" }, { status: 500 });
    };
};