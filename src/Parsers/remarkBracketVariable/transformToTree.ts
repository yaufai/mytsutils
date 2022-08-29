import { isParagraphNode } from "../../ParserUtils/utils";
import { splitTextLiteralbyRegex } from "../../ParserUtils/splitTextLiteralByRegex";
import { Paragraph, Text } from "mdast"
import { Options, BracketVariableNode } from "./utils";


export function containsBracketVaribale(node: unknown): boolean {
    return isParagraphNode(node)
}

export function getNewChildren(opt: Options, node: unknown): any[] {
    if (isBlockBracketVariable(node)) {
        return [
            {
                ...node.children[0],
                ...createNode(opt, (node.children[0] as Text).value, true)
            }
        ]
    } else if (isParagraphNode(node)) {
        return node.children.reduce<any[]>((acc, cur: any) => {
            const additional = cur.type === "text"
                ? splitTextLiteralbyRegex(cur, /\[([^\]]+)\]/g, (t) => createNode(opt, t, false))
                : [ cur ]
            return [
                ...acc,
                ...additional
            ]
        }, [])
    }
    return (node as { children: any[] }).children
}

function createNode(opt: Options, t: string, isBlock: boolean): BracketVariableNode {
    const indexOfSep = t.indexOf(":")

    const sizePrefix = isBlock ? 2 : 1
    return {
        type : isBlock
            ? "bracketVariableBlock"
            : "bracketVariableInline",
        value   : indexOfSep >= 0
            ? t.slice(indexOfSep + 1, t.length - 1)
            : t.slice(sizePrefix, t.length - 1),
        category: indexOfSep >= 0
            ? t.slice(sizePrefix, indexOfSep)
            : opt.defalutCategory
    }
}

function isBlockBracketVariable(node: unknown): node is Paragraph {
    if (!isParagraphNode(node)) {
        return false
    } else {
        if (node.children.length !== 1) {
            return false
        }
        const text = node.children[0] as Text
        const match = /\!\[([^\]]+)\]/.exec(text.value)

        if (match === null || text.value !== match[0]) {
            return false
        }

        return true
    }
}