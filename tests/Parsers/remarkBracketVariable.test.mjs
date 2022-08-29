import assert   from "assert"
import module from "../../dist/index.js"

import { unified }  from "unified"
import { remark  }  from "remark"
import parser   from "remark-parse"

const { Parsers, ParserUtils } = module

const ModuleName = "Bracket Variable"

describe(ModuleName,  () => {
    describe("Markdown generator", () => {
        const processor = remark()
            .use(Parsers.remarkBracketVariable())
            .freeze()
        const parse = (text) => {
            return processor.processSync(text)
        }
        
        it("regular case: inline (default class)", () => {
            const actual   = parse("これは[変数]です").value
            const expected = "これは[変数](変数)です\n"
            assert.equal(actual, expected)
        })

        it("regular case: block (default class)", () => {
            const actual   = parse("![変数]").value
            const expected = "[変数](変数)\n"
            assert.equal(actual, expected)
        })
    
    })
    describe("AST generator", () => {
        const processor = unified()
            .use(parser)
            .use(Parsers.remarkBracketVariable({ defalutClass: "クラス" }))
            .use(ParserUtils.stringifyCompiler)
            .freeze()
        
        const parse = (text) => {
            return JSON.parse(processor.processSync(text).value)
        }

        it("regular case: inline (default class)", () => {
            const actual   = parse("これは[変数]です")
            const expected = {
                type: "root",
                children: [
                    {
                        type: "paragraph",
                        children: [
                            {
                                type: "text",
                                value: "これは",
                                position: {
                                    start: {
                                        line: 1,
                                        column: 1,
                                        offset: 0
                                    },
                                    end: {
                                        line: 1,
                                        column: 4
                                    }
                                }
                            },
                            {
                                type: "link",
                                url: "変数",
                                children: [ { type: "text", value: "変数" }]
                            },
                            {
                                type: "text",
                                value: "です",
                                position: {
                                    start: {
                                        line: 1,
                                        column:8
                                    },
                                    end: {
                                        line: 1,
                                        column: 10
                                    }
                                }
                            }
                        ],
                        position: {
                            start: {
                                line: 1,
                                column: 1,
                                offset: 0
                            },
                            end: {
                                line: 1,
                                column: 10,
                                offset: 9
                            }
                        }
                    }
                ],
                position: {
                    start: {
                        line: 1,
                        column: 1,
                        offset: 0
                    },
                    end: {
                        line: 1,
                        column: 10,
                        offset: 9
                    }
                }
            }
            assert.deepEqual(actual, expected)
        })

        it("regular case: inline (with class)", () => {
            const actual   = parse("これは[クラス:変数]です")
            const expected = {
                type: "root",
                children: [
                    {
                        type: "paragraph",
                        children: [
                            {
                                type: "text",
                                value: "これは",
                                position: {
                                    start: {
                                        line: 1,
                                        column: 1,
                                        offset: 0
                                    },
                                    end: {
                                        line: 1,
                                        column: 4
                                    }
                                }
                            },
                            {
                                type: "link",
                                url: "変数",
                                children: [ { type: "text", value: "変数" }]
                            },
                            {
                                type: "text",
                                value: "です",
                                position: {
                                    start: {
                                        line: 1,
                                        column:12
                                    },
                                    end: {
                                        line: 1,
                                        column: 14
                                    }
                                }
                            }
                        ],
                        position: {
                            start: {
                                line: 1,
                                column: 1,
                                offset: 0
                            },
                            end: {
                                line: 1,
                                column: 14,
                                offset: 13
                            }
                        }
                    }
                ],
                position: {
                    start: {
                        line: 1,
                        column: 1,
                        offset: 0
                    },
                    end: {
                        line: 1,
                        column: 14,
                        offset: 13
                    }
                }
            }
            assert.deepEqual(actual, expected)
        })

        it("negative case: inline (default class)", () => {
            const actual   = parse("ここには[変数はありません。")
            const expected = {
                type: "root",
                children: [
                    {
                        type: "paragraph",
                        children: [
                            {
                                type: "text",
                                value: "ここには[変数はありません。",
                                position: {
                                    start: {
                                        line: 1,
                                        column: 1,
                                        offset: 0
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                }
                            }
                        ],
                        position: {
                            start: {
                                line: 1,
                                column: 1,
                                offset: 0
                            },
                            end: {
                                line: 1,
                                column: 15,
                                offset: 14
                            }
                        }
                    }
                ],
                position: {
                    start: {
                        line: 1,
                        column: 1,
                        offset: 0
                    },
                    end: {
                        line: 1,
                        column: 15,
                        offset: 14
                    }
                }
            }
            assert.deepEqual(actual, expected)
        })
        
        it("negative case: inline (with class)", () => {
            const actual   = parse("ここには[クラス:変数はありません。")
            const expected = {
                type: "root",
                children: [
                    {
                        type: "paragraph",
                        children: [
                            {
                                type: "text",
                                value: "ここには[クラス:変数はありません。",
                                position: {
                                    start: {
                                        line: 1,
                                        column: 1,
                                        offset: 0
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                }
                            }
                        ],
                        position: {
                            start: {
                                line: 1,
                                column: 1,
                                offset: 0
                            },
                            end: {
                                line: 1,
                                column: 19,
                                offset: 18
                            }
                        }
                    }
                ],
                position: {
                    start: {
                        line: 1,
                        column: 1,
                        offset: 0
                    },
                    end: {
                        line: 1,
                        column: 19,
                        offset: 18
                    }
                }
            }
            assert.deepEqual(actual, expected)
        })

        it("regular case: block (default class)", () => {
            const actual   = parse("![変数]")
            const expected = {
                type: "root",
                children: [
                    {
                        type: "paragraph",
                        children: [
                            {
                                type: "link",
                                url: "変数",
                                children: [ { type: "text", value: "変数" }]
                            }
                        ],
                        position: {
                            start: {
                                line: 1,
                                column: 1,
                                offset: 0
                            },
                            end: {
                                line: 1,
                                column: 6,
                                offset: 5
                            }
                        }
                    }
                ],
                position: {
                    start: {
                        line: 1,
                        column: 1,
                        offset: 0
                    },
                    end: {
                        line: 1,
                        column: 6,
                        offset: 5
                    }
                }
            }
            assert.deepEqual(actual, expected)
        })
        
        it("regular case: block (default class)", () => {
            const actual   = parse("![クラス:変数]")
            const expected = {
                type: "root",
                children: [
                    {
                        type: "paragraph",
                        children: [
                            {
                                type: "link",
                                url: "変数",
                                children: [ { type: "text", value: "変数" }]
                            }
                        ],
                        position: {
                            start: {
                                line: 1,
                                column: 1,
                                offset: 0
                            },
                            end: {
                                line: 1,
                                column: 10,
                                offset: 9
                            }
                        }
                    }
                ],
                position: {
                    start: {
                        line: 1,
                        column: 1,
                        offset: 0
                    },
                    end: {
                        line: 1,
                        column: 10,
                        offset: 9
                    }
                }
            }
            assert.deepEqual(actual, expected)
        })
    })
})

