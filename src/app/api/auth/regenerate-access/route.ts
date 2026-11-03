import BROWSER_STORAGE from "@/src/constants/browserStorage";
import serverAPI from "@/src/lib/serverAPI";
import getAPIError from "@/src/utils/server/api/getAPIError";
import getClientInfoAndHeaders from "@/src/utils/server/api/getClientInfoAndHeaders";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body || !body?.accessToken) {
            return NextResponse.json({ message: "__401" }, { status: 401 });
        };

        const cookieStore = await cookies();

        const refreshToken = cookieStore.get(BROWSER_STORAGE.COOKIES.AUTH.REFRESH_TOKEN);

        if (!refreshToken) {
            return NextResponse.json({ message: "__401" }, { status: 401 });
        };

        const { headers } = getClientInfoAndHeaders(request);

        const { data, status } = await serverAPI.post(
            "/auth/regenerate/access-token",
            { refreshToken: refreshToken?.value },
            { headers }
        );

        if (!data?.accessToken) {
            return NextResponse.json({ message: "__401" }, { status: 401 });
        };

        const { accessToken } = data;

        return NextResponse.json({ accessToken }, { status })
    } catch (error) {
        const { message, status } = await getAPIError(error, {
            removeCookies: [
                BROWSER_STORAGE.COOKIES.AUTH.REFRESH_TOKEN
            ]
        });

        return NextResponse.json({ message }, { status });
    };
};