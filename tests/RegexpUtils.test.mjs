import assert   from "assert"
import module from "../dist/index.js"

const getAllMatches = module.getAllMatches
const ModuleName = "RegexpUtils"

describe(ModuleName, () => {
    describe("getAllMatches", () => {
        it("outputs all matches if they exist", () => {
            let pattern  = /a+/
            let document = "aaabaa"
            let actual   = getAllMatches(pattern, document)
            assert(
                actual[0][0] === "aaa" &&
                actual[1][0] === "aa"
            )
        }),
        it("handles well even if there is no match", () => {
            let pattern  = /a+/
            let document = "bb"
            let actual   = getAllMatches(pattern, document)
            assert(
                actual.length === 0
            )
        }),
        it("preserves groupings", () => {
            let pattern  = /(?<language>[a-z]{2})-(?<country>[a-z]{2})/
            let document = "ja-jp,en-us,zh-cn"
            let actual   = getAllMatches(pattern, document)

            let jajp = actual[0]
            let enus = actual[1]
            let zhcn = actual[2]
            assert(
                jajp.groups["language"] === "ja" &&
                jajp.groups["country"]  === "jp" &&
                enus.groups["language"] === "en" &&
                enus.groups["country"]  === "us" &&
                zhcn.groups["language"] === "zh" &&
                zhcn.groups["country"]  === "cn"
            )
        })
    })
})