"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const cookie_session_1 = __importDefault(require("cookie-session"));
const bookRouter_1 = __importDefault(require("./router/bookRouter"));
//import orderRouter from './router/orderRoutes';
const common_1 = require("../common");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:8080',
}));
app.set('trust proxy', true);
//middleware
app.use((0, morgan_1.default)('tiny'));
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_session_1.default)({
    signed: false,
    secure: false,
}));
app.use('api/books', bookRouter_1.default);
//app.use('api/order', orderRouter);
app.use(common_1.errorHandler);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.MONGO_URI)
        throw new Error('MONGO_URI is required');
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    }
    catch (err) {
        console.error('Database connection error:', err);
        throw new Error('database eror');
    }
    app.listen(8080, () => console.log('Server running http://localhost:8080/'));
});
start();
