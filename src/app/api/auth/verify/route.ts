import BROWSER_STORAGE from "@/src/constants/browserStorage";
import serverAPI from "@/src/lib/serverAPI";
import getAPIError from "@/src/utils/server/api/getAPIError";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
       const cookieStore = await cookies();

        const currentRefreshToken = cookieStore.get(BROWSER_STORAGE.COOKIES.AUTH.REFRESH_TOKEN);

        if (!currentRefreshToken) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 500 });
        };

        const clientIp =
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            request.headers.get("x-real-ip");

        const userAgent = request.headers.get("user-agent");

        const { data, status } = await serverAPI.post(
            "/auth/verify",
            { refreshToken: currentRefreshToken?.value },
            {
                headers: {
                    "x-client-ip": clientIp,
                    "x-client-user-agent": userAgent,
                }
            });

        const { refreshToken, ...userData } = data;

        if (!refreshToken) {
            return NextResponse.json({ message: "Session expired, please sign in again" }, { status });
        };

        cookieStore.set(BROWSER_STORAGE.COOKIES.AUTH.REFRESH_TOKEN, refreshToken, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        return NextResponse.json(userData, { status });
    } catch (error) {
        const { message, status } = await getAPIError(error, {
            removeCookies: [
                BROWSER_STORAGE.COOKIES.AUTH.REFRESH_TOKEN
            ]
        });

        return NextResponse.json({ message }, { status });
    };
};