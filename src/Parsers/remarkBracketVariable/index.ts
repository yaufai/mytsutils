import { visit } from "unist-util-visit"
import { Node, Parent } from "unist";
import { BuildVisitor } from "unist-util-visit/complex-types";
import { isParagraphNode } from "../../ParserUtils/utils";
import { splitTextLiteralbyRegex } from "../../ParserUtils/splitTextLiteralByRegex";

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
        const regex = /\[([^\]]+)\]/g
    
        function replace(textLiteral: any) {
            return splitTextLiteralbyRegex(textLiteral, regex, (t) => {
                const indexOfSep = t.indexOf(":")

                return {
                    type : "bracketVariable",
                    value: indexOfSep >= 0 ? t.slice(indexOfSep + 1, t.length - 1) : t.slice(1, t.length - 1),
                    class: indexOfSep >= 0 ? t.slice(1, indexOfSep)  : opt.defalutClass
                }
            })
        }
        if (isParagraphNode(node)) {
            node.children = node.children.reduce<any[]>((acc, cur) => {
                return [ ...acc, ...replace(cur) ]
            }, [])
        }
    }
}
