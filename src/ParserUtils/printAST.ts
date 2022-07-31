import unified from "unified"
import { Node } from "unist"
import { inspect } from "unist-util-inspect"

export const printAST: unified.Plugin = () => {
    return (tree: Node) => {
        console.log(inspect(tree))
    }
}