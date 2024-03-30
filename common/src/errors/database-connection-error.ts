import { CustomError } from "./custom-errors";

export class DatabaseConnectionError extends CustomError {
    statusCode: number = 500;

    constructor() {
        super('db connection error')
    }

    generateErros() {
        return [{ message: 'db connection error' }]
    }

}