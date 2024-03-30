export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message);
    }

    abstract generateErros(): { message: string, field?: string }[]
}
// check this