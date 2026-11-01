import { AxiosError } from "axios";
import { cookies } from "next/headers";

interface Options {
    removeCookies?: string[];
};

const getAPIError = async (error: unknown, options?: Options) => {
    let message = "Server error occurred, please try again";
    let status = 500;

    if (error instanceof Error) {
        message = error?.message;
    };

    if (error instanceof AxiosError) {
        message = error?.response?.data?.message;
        status = error?.status ?? 500;
    };

    if (options) {
        const { removeCookies } = options;

        if (removeCookies && removeCookies?.length) {
            const cookieStore = await cookies();

            removeCookies.forEach(cookie => {
                cookieStore.delete(cookie);
            });
        };
    };

    return { message, status }
};

export default getAPIError;