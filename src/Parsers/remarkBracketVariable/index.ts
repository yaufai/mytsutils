import buildBracketVariableTransformer, { containsBracketVaribale, createNode } from "./transformToTree"
import buildToHastHandler from "./transformToMarkdown"
import { BracketVariableNode, Options } from "./utils"
import { Node, Parent } from "unist";
import { visit } from "unist-util-visit"
import { BuildVisitor } from "unist-util-visit/complex-types";

export default function remarkBracketVariable(options?: { [O in keyof Options]?: Options[O] }) {
    const opt: Options = {
        defalutClass: "",
        inlineConvertor: function (node: BracketVariableNode): string {
            throw new Error("Function not implemented.")
        },
        blockConvertor: function (node: BracketVariableNode): string {
            throw new Error("Function not implemented.")
        }
    }
    const transformer = (node: unknown) => {
        // ここのノードはまだ変換されていない。特定もしていない
        // まずChildrenにBracketNodeをつくる
        // Filterして変換
    }
    return () => {
        return (tree: Node) => {
            visit(tree, containsBracketVaribale, transformer as any)
        }
    }

}