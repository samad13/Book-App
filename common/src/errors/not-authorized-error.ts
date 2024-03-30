import { CustomError } from "./custom-errors";

export class NotAuthorizedError extends CustomError {
    statusCode = 401;
    constructor() {
        super('not authorised')
    }

    generateErros() {
        return [{ message: "not authorized" }]
    }
}