import COOKIES from "@/src/constants/cookies";
import serverAPI from "@/src/lib/serverAPI";
import schemaValidator from "@/src/utils/validators/schemaValidator";
import validationSchemas from "@/src/validationSchemas/validationSchema";
import { AxiosError } from "axios";
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

        const { refreshToken, ...userData } = data;

        if (!refreshToken) {
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

        return NextResponse.json(userData, { status });
    } catch (error) {
        let message = "";
        let status = 500;

        if (error instanceof Error) {
            message = error?.message;
        };

        if (error instanceof AxiosError) {
            message = error?.response?.data?.message;
            status = error?.status ?? 500;
        };

        if (!message) message = "Server error occurred, please try again";

        return NextResponse.json({ message }, { status });
    };
};