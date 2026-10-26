import SERVER_ENV from "@/src/constants/env/serverEnv";
import serverAPI from "@/src/lib/serverAPI";
import schemaValidator from "@/src/utils/validators/schemaValidator";
import validationSchemas from "@/src/validationSchemas/validationSchema";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { success, data: values, errors } = schemaValidator(validationSchemas.auth.login, body);

        if (!success) {
            return NextResponse.json(
                { message: Object.values(errors ?? {})?.[0] ?? "Invalid input" },
                { status: 400 }
            );
        };

        const { data } = await serverAPI.post("/auth/login", values);

        const { name, role, accessToken, refreshToken } = data;

        if (!accessToken || !refreshToken) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
        };

        const cookieStore = await cookies();

        cookieStore.set("user-ref", refreshToken, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
            sameSite: "lax",
            secure: SERVER_ENV.APP_ENV !== "local",
        });

        return NextResponse.json({ accessToken, role, name }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Server error occurred" }, { status: 500 });
    };
};