import assert   from "assert"
import module from "../dist/index.js"

import { unified }  from "unified"
import parser   from "remark-parse"
import toHast   from "remark-rehype"
import compiler from "rehype-stringify"

const { Parsers, ParserUtils } = module

const ModuleName = "Parsers"

describe(ModuleName,  () => {
    const processor = unified()
        .use(parser)
        .use(Parsers.remarkBracketVariable)
        .use(ParserUtils.printAST)
        .use(toHast)
        .use(compiler)
        .freeze()
    
    it("regular case: []", () => {
        const result = processor.processSync("これは[変数]です。これも[クラス:変数]です。\n\nここには[変数はありません。")
        assert(true)
    })
})

