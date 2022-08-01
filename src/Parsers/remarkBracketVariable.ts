import { visit } from "unist-util-visit"
import { Node, Parent } from "unist";
import { BuildVisitor } from "unist-util-visit/complex-types";

export default function () {
    return (tree: Node) => {
        visit(tree, isBracketVaribale, visitor)
    }
}

function isBracketVaribale(node: unknown) {

}

const visitor: BuildVisitor<Node, (node: unknown) => void> = (node: Node, index: number|null, parent: Parent) => {

}