import COOKIES from "@/src/constants/cookies";
import SERVER_ENV from "@/src/constants/env/serverEnv";
import serverAPI from "@/src/lib/serverAPI";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();

        const currentRefreshToken = cookieStore.get(COOKIES.AUTH.REFRESH_TOKEN);

        if (!currentRefreshToken) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 500 });
        };

        const clientIp =
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            request.headers.get("x-real-ip");

        const userAgent = request.headers.get("user-agent");

        const { data, status } = await serverAPI.post(
            "/auth/verify",
            { refreshToken: currentRefreshToken },
            {
                headers: {
                    "x-client-ip": clientIp,
                    "x-client-user-agent": userAgent,
                }
            });

        const { name, role, accessToken, refreshToken } = data;

        if (!accessToken || !refreshToken || !role) {
            return NextResponse.json({ message: "Auth verification failed, please sign in again" }, { status: 401 });
        };

        cookieStore.set(COOKIES.AUTH.REFRESH_TOKEN, refreshToken, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
            sameSite: "lax",
            secure: SERVER_ENV.APP_ENV !== "local",
        });

        return NextResponse.json({ accessToken, role, name }, { status });
    } catch (error) {
        return NextResponse.json({ message: "Server error occurred" }, { status: 500 });
    };
};