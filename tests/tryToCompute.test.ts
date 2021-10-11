import assert from "assert"
import { tryToCompute } from "../src"

const ModuleName = "tryToCompute"

describe(ModuleName, () => {
    const detactYear: (x: string) => number = x => {
        const result  = x.match(new RegExp(/\d{4}/))
        if (result === null) {
            throw new Error("No year found!")
        } else {
            return Number(Array.from(result)[0])
        }   
    }
    const defaultYear = 2021
    const avoid       = (yr: number) => yr <= defaultYear
    describe("without avoid function", () => {
        const testFunction = tryToCompute(detactYear, defaultYear)
        it("regular case", () => {
            assert.strictEqual(testFunction("9980"), 9980)
        })
        it("avoid", () => {
            assert.strictEqual(testFunction("1999"), 1999)
        })
        it("error case", () => {
            assert.strictEqual(testFunction("202x"), defaultYear)
        })
    })

    describe("with avoid function", () => {
        const testFunction = tryToCompute(detactYear, defaultYear, avoid)
        it("regular case", () => {
            assert.strictEqual(testFunction("9980"), 9980)
        })
        it("null", () => {
            assert.strictEqual(testFunction("1999"), defaultYear)
        })
        it("error case", () => {
            assert.strictEqual(testFunction("202x"), defaultYear)
        })
    })
})