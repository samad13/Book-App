"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionError = void 0;
const custom_errors_1 = require("./custom-errors");
class DatabaseConnectionError extends custom_errors_1.CustomError {
    constructor() {
        super('db connection error');
        this.statusCode = 500;
    }
    generateErros() {
        return [{ message: 'db connection error' }];
    }
}
exports.DatabaseConnectionError = DatabaseConnectionError;
