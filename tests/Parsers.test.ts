import assert from "assert"
import { unified } from "unified"
import parser from "remark-parse"
import toHast from "remark-rehype"
import compiler from "rehype-stringify";
import { Parsers } from "../src/index"

const ModuleName = "Parsers"

describe(ModuleName, () => {
    const processor = unified()
        .use(parser)
        .use(Parsers.remarkBracketVariable)
        .use(toHast)
        .use(compiler)
        .freeze()
    
    it("regular case: []", () => {
        const result = processor.processSync("これは[変数]です。\n\nこれも[クラス:変数]です。\n")
        console.log(result)
        assert(true)
    })
})