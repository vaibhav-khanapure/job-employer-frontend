import type { NextRequest } from "next/server";

const getClientInfoAndHeaders = (request: NextRequest) => {
    const clientIp =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        null;

    const userAgent = request.headers.get("user-agent");

    const headers = {
        "x-client-ip": clientIp,
        "x-client-user-agent": userAgent,
    };

    return { clientIp, headers, userAgent }
};

export default getClientInfoAndHeaders