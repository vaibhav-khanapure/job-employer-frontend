import BROWSER_STORAGE from "@/src/constants/browserStorage";
import serverAPI from "@/src/lib/serverAPI";
import { AxiosError } from "axios";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    let cookieStore: ReadonlyRequestCookies | null = null;

    try {
        const clientIp =
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            request.headers.get("x-real-ip");

        if (!clientIp) {
            return NextResponse.json({ message: "Invalid client source" }, { status: 400 });
        };

        const { data, status } = await serverAPI.post("/auth/google/initiate", {
            clientIp
        });

        if (!data?.code) {
            return NextResponse.json({ message: "Session expired" }, { status: 500 });
        };

        cookieStore = await cookies();

        cookieStore.set(BROWSER_STORAGE.COOKIES.AUTH.GOOGLE_TEMPORARY_CODE, data?.code, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/api/auth/google",
            maxAge: 5 * 60,
        });

        return NextResponse.json(null, { status });
    } catch (error) {
        if (cookieStore) {
            cookieStore.delete(BROWSER_STORAGE.COOKIES.AUTH.GOOGLE_TEMPORARY_CODE);
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