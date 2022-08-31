import { Options, BracketVariableNode } from "./utils";

export default function transformToMarkdown(opt: Options, node: BracketVariableNode) {
    const result = node.type === "bracketVariableBlock"
        ? opt.compileBlock(node.value, node.category)
        : opt.compileInline(node.value, node.category)
    
    if (typeof result === "string") {
        return { type: 'text', value: result }
    } else {
        return result
    }
}
