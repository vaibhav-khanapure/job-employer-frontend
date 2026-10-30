import serverAPI from "@/src/lib/serverAPI";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest, } from "next/server";
import { type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import COOKIES from "@/src/constants/cookies";

export async function POST(request: NextRequest) {
    let cookieStore: ReadonlyRequestCookies | null = null;

    try {
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

        const { data, status } = await serverAPI.post("/auth/google", {
            clientIp,
            code: googleCode?.value
        });

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