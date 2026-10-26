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
        throw new Error(result?.message ?? "Some error occurred");
    };

    return result;
};

export default authAPIAction;