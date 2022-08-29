import { Paragraph, Text } from "mdast"

export function isParagraphNode(node: any): node is Paragraph {
    return node.children !== undefined && node.type === "paragraph";
}

export function isTextLiteral(node: any): node is Text {
    return typeof node.value === "string" && node.type === "text"
}