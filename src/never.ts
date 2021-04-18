export default function never<T>(val: never): T {
    return val as T
}