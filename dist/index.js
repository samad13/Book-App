"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const bookRouter_1 = __importDefault(require("./router/bookRouter"));
const orderRoutes_1 = __importDefault(require("./router/orderRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:8080',
}));
//middleware
app.use((0, morgan_1.default)('tiny'));
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('api/books', bookRouter_1.default);
app.use('api/order', orderRoutes_1.default);
const start = async () => {
    if (!process.env.MONGO_URI)
        throw new Error('MONGO_URI is required');
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
    }
    catch (err) {
        throw new Error('database eror');
    }
    app.listen(8080, () => console.log('Server running http://localhost:8080/'));
};
start();
//# sourceMappingURL=index.js.map