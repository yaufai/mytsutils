import assert   from "assert"
import module from "../dist/index.js"

import { unified }  from "unified"
import parser   from "remark-parse"
import toHast   from "remark-rehype"
import compiler from "rehype-stringify"

const Parsers = module.Parsers

const ModuleName = "Parsers"

describe(ModuleName,  () => {
    const processor = unified()
        .use(parser)
        .use(Parsers.remarkBracketVariable)
        .use(toHast)
        .use(compiler)
        .freeze()
    
    it("regular case: []", () => {
        const result = processor.processSync("これは[変数]です。\n\nこれも[クラス:変数]です。\n")
        assert(true)
    })
})

