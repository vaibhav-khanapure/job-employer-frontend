import COOKIES from "@/src/constants/cookies";
import serverAPI from "@/src/lib/serverAPI";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("user-ref")?.value;

    cookieStore.delete(COOKIES.AUTH.REFRESH_TOKEN);

    if (!refreshToken) {
        return NextResponse.json(
            { message: "Already logged out" },
            { status: 200 }
        );
    };

    try {
        await serverAPI.post("/auth/logout", { refreshToken });

        return NextResponse.json(null, { status: 200 });
    } catch (error) {
        return NextResponse.json(null, { status: 500 });
    };
};