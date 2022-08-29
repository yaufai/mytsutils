import { Point } from "unist-util-inspect"

export type BracketVariableType
    = "bracketVariableInline"
    | "bracketVariableBlock"

export interface BracketVariableNode {
    type: BracketVariableType
    value: string
    category: string
    position?: {
        start: Point
        end  : Point
    }
}
export function isBracketVariableNode(node: unknown): node is BracketVariableNode {
    if (typeof node !== "object" || node === null) {
        return false
    }

    const n = node as BracketVariableNode
    return (n.type === "bracketVariableBlock" || n.type === "bracketVariableInline")
        && typeof n.category === "string"
        && typeof n.value    === "string"
}

type MarkdownNode = any

export interface Options {
    defalutCategory  : string
    compileInline: (value: string, category: string) => (string|MarkdownNode)
    compileBlock : (value: string, category: string) => (string|MarkdownNode)
}