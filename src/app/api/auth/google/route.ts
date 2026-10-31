import serverAPI from "@/src/lib/serverAPI";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest, } from "next/server";
import { type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { AxiosError } from "axios";
import BROWSER_STORAGE from "@/src/constants/browserStorage";

export async function POST(request: NextRequest) {
    let cookieStore: ReadonlyRequestCookies | null = null;

    try {
        const { code } = await request.json();

        if (!code) {
            return NextResponse.json({ message: "Invalid data" }, { status: 400 });
        };

        const clientIp =
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            request.headers.get("x-real-ip");

        if (!clientIp) {
            return NextResponse.json({ message: "Invalid client source" }, { status: 400 });
        };

        cookieStore = await cookies();

        const googleCodeCookie = cookieStore.get(BROWSER_STORAGE.COOKIES.AUTH.GOOGLE_TEMPORARY_CODE);

        if (!googleCodeCookie) {
            return NextResponse.json({ message: "Session expired" }, { status: 400 });
        };

        const userAgent = request.headers.get("user-agent");

        const { data, status } = await serverAPI.post(
            "/auth/google",
            {
                code: googleCodeCookie?.value,
                googleCode: code
            },
            {
                headers: {
                    "x-client-ip": clientIp,
                    "x-client-user-agent": userAgent,
                }
            }
        );

        if (status === 204) {
            cookieStore.set(BROWSER_STORAGE.COOKIES.AUTH.GOOGLE_PROVIDED_CODE, code, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/api/auth/google",
                maxAge: 5 * 60,
            });

            return new NextResponse(null, { status: 204 });
        };

        const { refreshToken, ...userData } = data;

        cookieStore.delete(BROWSER_STORAGE.COOKIES.AUTH.GOOGLE_TEMPORARY_CODE);

        cookieStore.set(BROWSER_STORAGE.COOKIES.AUTH.REFRESH_TOKEN, refreshToken, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });

        return NextResponse.json(userData, { status });
    } catch (error) {
        if (cookieStore) {
            cookieStore.delete(BROWSER_STORAGE.COOKIES.AUTH.GOOGLE_TEMPORARY_CODE);
            cookieStore.delete(BROWSER_STORAGE.COOKIES.AUTH.REFRESH_TOKEN);
            cookieStore.delete(BROWSER_STORAGE.COOKIES.AUTH.GOOGLE_PROVIDED_CODE);
        };

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