import { visit } from "unist-util-visit"
import { Node, Parent } from "unist";
import { BuildVisitor } from "unist-util-visit/complex-types";
import { isParagraphNode } from "../../ParserUtils/utils";
import { splitTextLiteralbyRegex } from "../../ParserUtils/splitTextLiteralByRegex";
import { Paragraph, Text } from "mdast"


interface BuildBracketVariableTransformerOptions {
    defalutClass: string
}

export default function buildBracketVariableTransformer (opt: BuildBracketVariableTransformerOptions) {
    return () => {
        return (tree: Node) => {
            visit(tree, containsBracketVaribale, instantiateVisitor(opt))
        }
    }
}

function containsBracketVaribale(node: unknown): boolean {
    return isParagraphNode(node)
}

function instantiateVisitor(opt: BuildBracketVariableTransformerOptions): BuildVisitor<Node, (node: unknown) => void> {
    return (node: unknown, index: number|null, parent: Parent) => {
        if (isBlockBracketVariable(node)) {
            node.children = [
                {
                    ...node.children[0],
                    ...createNode(opt, (node.children[0] as Text).value, true)
                } as any
            ]
        } else if (isParagraphNode(node)) {
            node.children = node.children.reduce<any[]>((acc, cur: any) => {
                return [
                    ...acc,
                    ...splitTextLiteralbyRegex(cur, /\[([^\]]+)\]/g, (t) => createNode(opt, t, false))
                ]
            }, [])
        }
    }
}

function createNode(opt: BuildBracketVariableTransformerOptions, t: string, isBlock: boolean) {
    const indexOfSep = t.indexOf(":")

    const sizePrefix = isBlock ? 2 : 1

    return {
        type : isBlock ? "bracketVariableBlock" : "bracketVariableInline",
        value: indexOfSep >= 0 ? t.slice(indexOfSep + 1, t.length - 1) : t.slice(sizePrefix, t.length - 1),
        class: indexOfSep >= 0 ? t.slice(sizePrefix, indexOfSep)  : opt.defalutClass
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