
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

export function splitByRegexp(regex: RegExp,  document: string, keepSeparator: boolean=false): string[] {
    const separators = getAllMatches(regex, document).map(m => m[0])

    let fraguments: string[] = []
    let remaining = document
    separators.forEach((sep) => {
        const index = remaining.indexOf(sep)
        const head  = remaining.slice(0, index)
        if (keepSeparator) {
            fraguments  = [...fraguments, head, sep ]
        } else {
            fraguments  = [...fraguments, head ]
        }
        
        remaining   = remaining.slice(index + sep.length)
    })

    return [ ...fraguments, remaining ]
}