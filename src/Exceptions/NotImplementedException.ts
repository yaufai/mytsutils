import { BaseError } from "./BaseError"

export class NotImplementedException extends BaseError {
    constructor(e?: string) {
        super(e)
        this.name = "This function/method is not yet implemented."
    }
}