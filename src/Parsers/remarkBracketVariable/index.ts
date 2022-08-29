import { containsBracketVaribale, getNewChildren } from "./transformToTree"
import { isBracketVariableNode, Options } from "./utils"
import { Node } from "unist";
import { visit } from "unist-util-visit"
import transformToMarkdown from "./transformToMarkdown";

export default function remarkBracketVariable(options?: { [O in keyof Options]?: Options[O] }) {
    const opt: Options = {
        defalutCategory: "",
        compileInline  : (value, _category) => value,
        compileBlock   : (value, _category) => value,
        ...options
    }
    const transformer = (node: any) => {
        const children = getNewChildren(opt, node)
            .map(childNode => {
                return isBracketVariableNode(childNode)
                    ? transformToMarkdown(opt, childNode)
                    : childNode
            })
        
        
        node.children = children

    }
    return () => {
        return (tree: Node) => {
            visit(tree, containsBracketVaribale, transformer)
        }
    }

}