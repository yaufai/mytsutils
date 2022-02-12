import { ArrayOperations } from "../src/index"
import { expect } from "chai"

const ModuleName = "ArrayOperations"

describe(ModuleName, () => {
    describe("intersperse", () => {
        it("empty list", () => {
            const expected = [] as string[]
            const actual   = ArrayOperations.intersperse<string>("", [])
            expect(expected).deep.equal(actual)
        })

        it("regular list", () => {
            const expected = [ 1, 0, 2, 0, 3 ]
            const actual   = ArrayOperations.intersperse<number>(0, [1, 2, 3])
            expect(expected).deep.equal(actual)
        })
    })
})

describe(ModuleName, () => {
    describe("cartesian", () => {
        it("empty t", () => {
            const expected = [] as [ string, number ][]
            const actual   = ArrayOperations.cartesian<string, number>([], [ 1, 2, 3 ])
            expect(expected).deep.equal(actual)
        })

        it("empty s", () => {
            const expected = [] as [ string, number ][]
            const actual   = ArrayOperations.cartesian<string, number>([ "a", "b", "c" ], [])
            expect(expected).deep.equal(actual)
        })

        it("empty t & s", () => {
            const expected = [] as [ string, number ][]
            const actual   = ArrayOperations.cartesian<string, number>([], [])
            expect(expected).deep.equal(actual)
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
            const actual   = ArrayOperations.cartesian<string, number>([ "a", "b" ], [ 1, 2, 3 ])
            expect(expected).deep.equal(actual)
        })
    })
})