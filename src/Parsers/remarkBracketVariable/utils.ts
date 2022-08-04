import { Point } from "unist-util-inspect"

export const InlineBracketVariable = "bracketVariableInline"
export const BlockBracketVariable  = "bracketVariableBlock"

export interface BracketVariableNode {
    type: "bracketVariableInline" | "bracketVariableBlock"
    class: string
    value: string
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
        && typeof n.class === "string"
        && typeof n.value === "string"
}

export interface BuildBracketVariableTransformerOptions {
    defalutClass: string
    inlineConvertor: (node: BracketVariableNode) => string
    blockConvertor: (node: BracketVariableNode) => string
}