import { VFileWithOutput } from "unified"

export default function stringify(this: any) {
    const compiler = (tree: VFileWithOutput<Object>) => {
        return JSON.stringify(tree, undefined, 4)
    }
    Object.assign(this, {Compiler: compiler})
}

