export function cartesian<T, S>(ts: T[], ss: S[]): [T, S][] {
    let rtn: [T, S][] = []
    ts.forEach(t => {
        ss.forEach(s => {
            rtn = [...rtn, [t,s]]
        })
    })
    return rtn
}