"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const book_1 = require("../controllers/book");
const checkObjectId_1 = __importDefault(require("../middleware/checkObjectId"));
router.route('/').get(book_1.getBooks).post(book_1.createBook);
router.route('/:id/reviews').post(checkObjectId_1.default, book_1.createBookReview);
router.get('/top', book_1.getTopbooks);
router
    .route('/:id')
    .get(checkObjectId_1.default, book_1.getBookById)
    .put(checkObjectId_1.default, book_1.updateBook)
    .delete(checkObjectId_1.default, book_1.deleteBook);
exports.default = router;
