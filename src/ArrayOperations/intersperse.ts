export function intersperse<T>(x: T, array: T[]): T[] {
    return array.reduce((acc, cur: T) => [...acc, cur, x], [] as T[])
        .slice(0, -1)
}
