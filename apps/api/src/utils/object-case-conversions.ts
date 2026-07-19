export function convertToSnakeCase<T extends Record<string, any>>(obj: T) {
    return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [
            k.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
            v
        ])
    );
}

export function convertToCamelCase<T extends Record<string, any>>(obj: T): Record<string, any> {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => {
            const camelKey = key.replace(/_([a-z0-9])/g, (_, match) => match.toUpperCase());
            return [camelKey, value];
        })
    );
}
