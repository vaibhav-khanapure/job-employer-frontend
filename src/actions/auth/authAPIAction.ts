interface Config {
    data?: unknown;
    method?: "POST" | "DELETE";
};

const authAPIAction = async (path: string, config: Config) => {
    try {
        const { data, method = "POST" } = config;

        const res = await fetch(`/api/auth${path}`, {
            method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            ...(data ? { body: JSON.stringify(data) } : {})
        });

        if (res.status === 204) {
            return { status: res?.status, data: null };
        };

        const result = await res.json();

        if (!res?.ok) {
            throw { errorMessage: result?.message ?? "Server error occurred" };
        };

        return { data: result, status: res?.status };
    } catch (error: unknown) {
        let errorMessage = "Server error occurred";

        if (error instanceof Error) {
            errorMessage = error?.message;
        };

        if (typeof error === "object" && error !== null && "errorMessage" in error) {
            errorMessage = error?.errorMessage as string;
        };

        throw { errorMessage };
    };
};

export default authAPIAction;