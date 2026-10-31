interface Config {
    data?: unknown;
    method?: "POST" | "DELETE";
};

const authAPIAction = async (path: string, config: Config) => {
    const { data, method = "POST" } = config;

    const res = await fetch(`/api/auth${path}`, {
        method,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        ...(data ? { body: JSON.stringify(data) } : {})
    });

    const result = await res.json();

    if (!res?.ok) {
        throw { errorMessage: result?.message ?? "Server error occurred" };
    };

    return { data: result, status: res?.status };
};

export default authAPIAction;