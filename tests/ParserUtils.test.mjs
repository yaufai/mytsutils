import assert from "assert"
import module from "../dist/index.js"

const ModuleName = "ParserUtils"
const splitTextLiteralByRegex = module.ParserUtils.splitTextLiteralByRegex

describe(ModuleName, () => {
    describe("splitTextLiteralByRegex", () => {
        it("regular case", () => {

            const pattern  = /\s+->\s+/
            const textLiteral = {
                type: 'text',
                value: 'aaa -> b'
            }
            const actual = splitTextLiteralByRegex(textLiteral, pattern)
            const expected = [
                {
                    type: 'text',
                    value: 'aaa'
                },
                {
                    type: 'text',
                    value: ' -> '
                },
                {
                    type: 'text',
                    value: 'b'
                }
            ]

            assert.deepEqual(actual, expected)
        })
        it("negative case", () => {

            const pattern  = /c/
            const textLiteral = {
                type: 'text',
                value: 'aaa -> b'
            }
            const actual = splitTextLiteralByRegex(textLiteral, pattern)
            const expected = [
                {
                    type: 'text',
                    value: 'aaa -> b'
                },
            ]

            assert.deepEqual(actual, expected)
        })
        it("processor", () => {

            const pattern  = /\s+->\s+/
            const textLiteral = {
                type: 'text',
                value: 'aaa -> b'
            }
            const actual = splitTextLiteralByRegex(
                textLiteral,
                pattern,
                (_t) => ({ type: 'text', value: "→" })
            )
            const expected = [
                {
                    type: 'text',
                    value: 'aaa'
                },
                {
                    type: 'text',
                    value: '→'
                },
                {
                    type: 'text',
                    value: 'b'
                }
            ]

            assert.deepEqual(actual, expected)
        })
    })
})