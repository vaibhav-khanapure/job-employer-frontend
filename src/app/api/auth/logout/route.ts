import BROWSER_STORAGE from "@/src/constants/browserStorage";
import serverAPI from "@/src/lib/serverAPI";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get(BROWSER_STORAGE.COOKIES.AUTH.REFRESH_TOKEN);

        if (!refreshToken) {
            return NextResponse.json(
                { message: "Already logged out" },
                { status: 200 }
            );
        };

        cookieStore.delete(BROWSER_STORAGE.COOKIES.AUTH.REFRESH_TOKEN);

        try {
            await serverAPI.post("/auth/logout", { refreshToken: refreshToken?.value });

            return NextResponse.json(null, { status: 200 });
        } catch (error) {
            return NextResponse.json(null, { status: 500 });
        };
    } catch (error) {
        return NextResponse.json({ message: 'Server error occurred' }, { status: 500 });
    };
};