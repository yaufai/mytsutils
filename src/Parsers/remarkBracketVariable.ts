import { visit } from "unist-util-visit"
import { Node, Parent } from "unist";
import { BuildVisitor } from "unist-util-visit/complex-types";
import { isParagraphNode } from "../ParserUtils/utils";
import { splitTextLiteralbyRegex } from "../ParserUtils/splitTextLiteralByRegex";

export default function () {
    return (tree: Node) => {
        visit(tree, containsBracketVaribale, visitor)
    }
}

function containsBracketVaribale(node: unknown): boolean {
    return isParagraphNode(node)
}

const visitor: BuildVisitor<Node, (node: unknown) => void> = (node: unknown, index: number|null, parent: Parent) => {
    const regex = /\[([^\]]+)\]/g

    function replace(textLiteral: any) {
        return splitTextLiteralbyRegex(textLiteral, regex, (t) => {
            const indexOfSep = t.indexOf(":")
            return {
                type : "bracketVariable",
                value: indexOfSep >= 0 ? t.slice(indexOfSep + 1, t.length - 1) : t.slice(1, t.length - 1),
                class: indexOfSep >= 0 ? t.slice(1, indexOfSep)  : "defaultClass"
            }
        })
    }
    if (isParagraphNode(node)) {
        node.children = node.children.reduce<any[]>((acc, cur) => {
            return [ ...acc, ...replace(cur) ]
        }, [])
    }
}