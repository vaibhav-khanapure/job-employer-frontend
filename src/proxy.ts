import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import BROWSER_STORAGE from './constants/browserStorage';

export const config = {
    matcher: [
        // Guest Routes
        '/',
        // Auth Routes
        '/dashboard', '/profile', '/jobs'
    ],
};

const guestPaths = config.matcher.slice(0, 1);
const authorizedPaths = config.matcher.slice(1);

export function proxy(request: NextRequest) {
    const proxyPass = request.cookies.get(BROWSER_STORAGE.COOKIES.AUTH.REFRESH_TOKEN);
    const pathname = request.nextUrl.pathname;

    if (!proxyPass && authorizedPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
    };

    if (proxyPass && guestPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/home', request.url))
    };

    return NextResponse.next();
};