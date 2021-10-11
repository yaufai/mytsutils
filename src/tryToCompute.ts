export default function tryToCompute<T, S>(fn: (x: T) => S, defVal: S, avoid?: (x: S) => boolean): (x: T) => S {
    return (x: T) => {
        try {
            const result = fn(x)
            if (typeof avoid !== "undefined") {
                return avoid(result) ? defVal : result
            } else {
                return result
            }          
        } catch {
            return defVal
        }
    }
}