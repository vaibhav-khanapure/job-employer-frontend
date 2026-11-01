import BROWSER_STORAGE from "@/src/constants/browserStorage";
import serverAPI from "@/src/lib/serverAPI";
import getAPIError from "@/src/utils/server/api/getAPIError";
import getClientInfoAndHeaders from "@/src/utils/server/api/getClientInfoAndHeaders";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();

        const currentRefreshToken = cookieStore.get(BROWSER_STORAGE.COOKIES.AUTH.REFRESH_TOKEN);

        if (!currentRefreshToken) {
            return NextResponse.json({ message: "Session expired, please sign in again" }, { status: 401 });
        };

        const { headers } = getClientInfoAndHeaders(request);

        const { data, status } = await serverAPI.post(
            "/auth/verify",
            { refreshToken: currentRefreshToken?.value },
            { headers });

        const { refreshToken, ...userData } = data;

        if (refreshToken) {
            cookieStore.set(BROWSER_STORAGE.COOKIES.AUTH.REFRESH_TOKEN, refreshToken, {
                httpOnly: true,
                path: "/",
                maxAge: 60 * 60 * 24 * 30,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
            });
        };

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