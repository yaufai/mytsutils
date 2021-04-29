
export function getAllMatches(regexp: RegExp, document: string): RegExpExecArray[] {
    let newOptions    = regexp.flags.includes("g") ? regexp.flags : regexp.flags + "g"
    let globalizedExp = new RegExp(regexp.source, newOptions)
    let rtn = [] as RegExpExecArray[]
    while (true) {
        let result = globalizedExp.exec(document)
        if (result == null) {
            break
        } else {
            rtn = rtn.concat([result])
        }
    }
    return rtn
}