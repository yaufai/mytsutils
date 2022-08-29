import assert   from "assert"
import module from "../dist/index.js"

const ArrayOperations = module.ArrayOperations
const ModuleName = "ArrayOperations"

describe(ModuleName, () => {
    describe("intersperse", () => {
        it("empty list", () => {
            const expected = []
            const actual   = ArrayOperations.intersperse("", [])
            assert.deepEqual(expected, actual)
        })

        it("regular list", () => {
            const expected = [ 1, 0, 2, 0, 3 ]
            const actual   = ArrayOperations.intersperse(0, [1, 2, 3])
            assert.deepEqual(expected, actual)
        })
    })
})

describe(ModuleName, () => {
    describe("cartesian", () => {
        it("empty t", () => {
            const expected = []
            const actual   = ArrayOperations.cartesian([], [ 1, 2, 3 ])
            assert.deepEqual(expected, actual)
        })

        it("empty s", () => {
            const expected = []
            const actual   = ArrayOperations.cartesian([ "a", "b", "c" ], [])
            assert.deepEqual(expected, actual)
        })

        it("empty t & s", () => {
            const expected = []
            const actual   = ArrayOperations.cartesian([], [])
            assert.deepEqual(expected, actual)
        })

        it("regular case", () => {
            const expected = [
                [ "a", 1 ],
                [ "a", 2 ],
                [ "a", 3 ],
                [ "b", 1 ],
                [ "b", 2 ],
                [ "b", 3 ],
            ]
            const actual   = ArrayOperations.cartesian([ "a", "b" ], [ 1, 2, 3 ])
            assert.deepEqual(expected, actual)
        })
    })
})