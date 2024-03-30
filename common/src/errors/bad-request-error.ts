import { CustomError } from "./custom-errors";

export class BadRequestError extends CustomError {
    statusCode = 400;
    constructor(public message: string) {
        super(message);
    }

    generateErros() {
        return [{ message: this.message }]

    }
}