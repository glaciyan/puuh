export function normalizedName(name: string | undefined) {
    if (!name) return "unknown";
    return name.trim().replace(/'/g, "").replace(/[ -]/g, "_").toLowerCase();
}

export function cleanSpecialCharacter(name: string) {
    return name.trim().replace(/\"/g, "")
}