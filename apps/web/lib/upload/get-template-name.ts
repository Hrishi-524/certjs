export function getTemplateName(name: string): string {
    if (!name) return "Untitled";

    // 1. Remove the file extension
    const baseName = name.substring(0, name.lastIndexOf('.')) || name;

    // 2. Clean delimiters, replace with space, and trim
    const cleanName = baseName.replace(/[-_,\s]+/g, ' ').trim();

    // 3. Enforce a strict character limit (30 characters)
    return cleanName.length > 30 ? cleanName.substring(0, 30).trim() : cleanName;
}
