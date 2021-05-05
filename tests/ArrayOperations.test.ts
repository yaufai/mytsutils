import assert from "assert"
import { ArrayOperations } from "../src/index"

const ModuleName = "ArrayOperations"

describe(ModuleName, () => {
    describe("intersperse", () => {
        it("empty list", () => {
            const expected = [] as string[]
            const actual   = ArrayOperations.intersperse<string>("", [])
            assert(expected.length === actual.length)
        })

        it("regular list", () => {
            const expected = [ 1, 0, 2, 0, 3 ]
            const actual   = ArrayOperations.intersperse<number>(0, [1, 2, 3])
            assert(
                expected.length === actual.length &&
                expected[0]     === actual[0]     &&
                expected[1]     === actual[1]     &&
                expected[2]     === actual[2]     &&
                expected[3]     === actual[3]     &&
                expected[4]     === actual[4]
            )

        })
    })
})