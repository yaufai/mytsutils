import { getAllMatches, splitByRegexp } from "../RegexpUtils"
import { Text } from "mdast"
import { Point } from "unist-util-inspect"

export function splitTextLiteralbyRegex<T>(text: Text, regex: RegExp, processor?: (t: string) => T): (Text|T)[] {
    const allMatches   = getAllMatches(regex, text.value).map(m => m[0])
    const allUnmatched = splitByRegexp(regex, text.value, false)

    const transitPosition  = (t: string, pos: Point) => {
        return {
            line: pos.line,
            column: pos.column + t.length,
            offset: pos.offset ? pos.offset + t.length: undefined
        }
    }
    function processorUnmatched(t: string, pos: Point|undefined): Text {
        return {
            type: "text",
            value: t,
            position: pos
                ? { start: pos, end: transitPosition(t, pos) }
                : undefined
        }
    }

    const processorMatched = processor
        ? (t: string, pos: Point|undefined) => ({
            ...processor(t),
            position: pos
                ? { start: pos, end: transitPosition(t, pos) }
                : undefined
        })
        : processorUnmatched

    let rtn: (Text|T)[] = []
    
    let curPosition = (typeof text.position !== "undefined" && typeof text.position.start !== "undefined")
        ? text.position.start
        : undefined

    for (let i = 0; i < allMatches.length; i++) {
        rtn = [ ...rtn, processorUnmatched(allUnmatched[i], curPosition) ]
        curPosition = curPosition
            ? transitPosition(allUnmatched[i], curPosition)
            : undefined
        rtn = [ ...rtn, processorMatched(allMatches[i], curPosition)]
        curPosition = curPosition
            ? transitPosition(allMatches[i], curPosition)
            : undefined
        
    }
    return [
        ...rtn,
        processorUnmatched(allUnmatched[allMatches.length], curPosition)
    ]
}