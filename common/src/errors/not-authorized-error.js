"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorizedError = void 0;
const custom_errors_1 = require("./custom-errors");
class NotAuthorizedError extends custom_errors_1.CustomError {
    constructor() {
        super('not authorised');
        this.statusCode = 401;
    }
    generateErros() {
        return [{ message: "not authorized" }];
    }
}
exports.NotAuthorizedError = NotAuthorizedError;
