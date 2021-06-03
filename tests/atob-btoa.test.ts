import assert from "assert"
import { atob, btoa } from "../src/index"

const ModuleName = "atob-btoa"

describe(ModuleName, () => {
    const ascii  = "こんにちは、世界！"
    const base64 = "44GT44KT44Gr44Gh44Gv44CB5LiW55WM77yB"
    describe("atob", () => {
        it("regular case", () => {
            assert.strictEqual(atob(ascii), base64)
        })
    })
    describe("btoa", () => {
        it("regular case", () => {
            assert.strictEqual(btoa(base64), ascii)
        })
    })
})