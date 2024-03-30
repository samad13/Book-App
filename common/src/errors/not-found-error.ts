import { CustomError } from "./custom-errors";

export class NotFoundError extends CustomError {
    statusCode: 400

    constructor() {
        super('not found')
    }

    generateErros() {
        return [{ message: 'not found' }]
    }
}