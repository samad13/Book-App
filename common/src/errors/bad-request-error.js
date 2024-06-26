"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const custom_errors_1 = require("./custom-errors");
class BadRequestError extends custom_errors_1.CustomError {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 400;
    }
    generateErros() {
        return [{ message: this.message }];
    }
}
exports.BadRequestError = BadRequestError;
