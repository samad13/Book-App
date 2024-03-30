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
exports.getTopbooks = exports.createBookReview = exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getBooks = void 0;
const book_1 = __importDefault(require("../models/book"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_1.default.findById(req.params.id);
    if (book) {
        res.json(book);
    }
    else {
        res.status(404).json({ message: 'Product not found' });
    }
}));
exports.getBookById = getBookById;
// // @desc    Fetch all books
// // @route   GET /api/books
// // @access  Public
const getBooks = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageSize = Number(process.env.PAGINATION_LIMIT);
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};
    const count = yield book_1.default.countDocuments(Object.assign({}, keyword));
    const books = yield book_1.default.find(Object.assign({}, keyword))
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json({ books, page, pages: Math.ceil(count / pageSize) });
}));
exports.getBooks = getBooks;
// @desc    Create a Book
// @route   POST /api/books
// @access  Private/Admin
const createBook = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, createdBy, image, genre, countInStock, numReviews, //ask
    description, } = req.body;
    const { userId } = req.params;
    const book = new book_1.default({
        name,
        price,
        createdBy,
        image,
        genre,
        countInStock,
        numReviews,
        description,
    });
    const createdBook = yield book.save();
    res.status(201).json(createdBook);
}));
exports.createBook = createBook;
// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, description, image, genre, countInStock } = req.body;
    const book = yield book_1.default.findById(req.params.id);
    if (book) {
        book.name = name;
        book.price = price;
        book.description = description;
        book.image = image;
        book.genre = genre;
        book.countInStock = countInStock;
        const updatedBook = yield book.save();
        res.json(updatedBook);
    }
    else {
        res.status(404);
        throw new Error('book not found');
    }
}));
exports.updateBook = updateBook;
// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_1.default.findById(req.params.id);
    if (book) {
        yield book_1.default.deleteOne({ _id: book._id });
        res.json({ message: 'book removed' });
    }
    else {
        res.status(404);
        throw new Error('book not found');
    }
}));
exports.deleteBook = deleteBook;
// @desc    Create new review
// @route   POST /api/books/:id/reviews
// @access  Private
const createBookReview = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rating } = req.body;
    const { user } = req.params;
    const book = yield book_1.default.findById(req.params.id);
    if (book) {
        const alreadyReviewed = book.reviews.find((r) => r.user.toString() === req.user._id.toString());
        if (alreadyReviewed) {
            res.status(400);
            throw new Error('book already reviewed');
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            user: req.user._id,
        };
        book.reviews.push(review);
        book.numReviews = book.reviews.length;
        book.rating =
            book.reviews.reduce((acc, item) => item.rating + acc, 0) / book.reviews.length;
        yield book.save();
        res.status(201).json({ message: 'Review added' });
    }
    else {
        res.status(404);
        throw new Error('book not found');
    }
}));
exports.createBookReview = createBookReview;
// @desc    Get top rated books
// @route   GET /api/books/top
// @access  Public
const getTopbooks = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_1.default.find({}).sort({ rating: -1 }).limit(6);
    res.json(books);
}));
exports.getTopbooks = getTopbooks;
