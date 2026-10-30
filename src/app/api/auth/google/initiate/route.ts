import COOKIES from "@/src/constants/cookies";
import serverAPI from "@/src/lib/serverAPI";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const clientIp =
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            request.headers.get("x-real-ip");

        if (!clientIp) {
            return NextResponse.json({ message: "Invalid client source" }, { status: 400 });
        };

        const { data } = await serverAPI.post("/auth/google/initiate", {
            clientIp
        });

        if (!data?.code) {
            return NextResponse.json({ message: "Session expired" }, { status: 500 });
        };

        const cookieStore = await cookies();

        cookieStore.set(COOKIES.AUTH.GOOGLE_TEMPORARY_CODE, data?.code, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/api/auth/google/initiate",
            maxAge: 5 * 60,
        });

        return NextResponse.json(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ message: "Server error occurred" }, { status: 500 });
    };
};