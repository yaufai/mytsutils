import assert   from "assert"
import module from "../../dist/index.js"

import { unified }  from "unified"
import parser   from "remark-parse"

const { Parsers, ParserUtils } = module

const ModuleName = "Inline Bracket Variable"

describe(ModuleName,  () => {
    const processor = unified()
        .use(parser)
        .use(Parsers.buildRemarkBracketVariable({ defalutClass: "クラス" }))
        .use(ParserUtils.stringifyCompiler)
        .freeze()
    
    const parse = (text) => {
        return JSON.parse(processor.processSync(text).value)
    }

    it("regular case: default class", () => {
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
                            type: "bracketVariable",
                            value: "変数",
                            class: "クラス",
                            position: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 8
                                }
                            }
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

    it("regular case: with class", () => {
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
                            type: "bracketVariable",
                            value: "変数",
                            class: "クラス",
                            position: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
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

    it("negative case: default class", () => {
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
    
    it("negative case: with class", () => {
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
})

