import { Node } from "unist";
import { Options, InlineBracketVariable } from "./utils";
import { H } from "mdast-util-to-hast";


// export default function buildToHastHandler(opt: Options) {
//     return (h: H, node: Node) => {
//         const tagName = node.type === InlineBracketVariable ? "span" : "div"
//         const value   = node.type === InlineBracketVariable
//             ? opt.inlineConvertor(node as any)
//             : opt.blockConvertor(node as any)
//         return {
//             type: "element",
//             tagName: tagName,
//             children: [{
//                 type : "text",
//                 value: value
//             }]
//         }
//     }
// }

export default function transformToMarkdown() {
    
}
