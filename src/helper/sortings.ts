export function sortByNumberAsc(a: number, b: number) {
    if (a === b) {
        return 0;
    }
    return a < b ? -1 : 1;
}

export function sortByStringAsc(a: string, b: string) {
    if (a === b) {
        return 0;
    }

    return a < b ? -1 : 1;
}
