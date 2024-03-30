"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const custom_errors_1 = require("./custom-errors");
class NotFoundError extends custom_errors_1.CustomError {
    constructor() {
        super('not found');
    }
    generateErros() {
        return [{ message: 'not found' }];
    }
}
exports.NotFoundError = NotFoundError;
