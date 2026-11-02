const hasChanges = (newData: unknown, oldData: unknown) => {
    if (
        typeof newData === "object" && newData !== null &&
        typeof oldData === "object" && oldData !== null &&
        !Array.isArray(newData) && !Array.isArray(oldData)
    ) {
        const newObj = newData as Record<string, unknown>;
        const oldObj = oldData as Record<string, unknown>;

        const result: Record<string, unknown> = {};

        for (const key of Object.keys(newObj)) {
            if (!Object.is(newObj[key], oldObj[key])) {
                result[key] = newObj[key];
            };
        };

        return {
            hasChanged: Object.keys(result).length > 0,
            result
        };
    }

    return {
        hasChanged: !Object.is(newData, oldData),
        result: newData
    };
};

export default hasChanges;