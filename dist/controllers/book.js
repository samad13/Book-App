"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopbooks = exports.createBookReview = exports.deleteBook = exports.updateBook = exports.creatBook = exports.getBookById = exports.getbooks = void 0;
const book_1 = __importDefault(require("../models/book"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = (0, express_async_handler_1.default)(async (req, res) => {
    const book = await book_1.default.findById(req.params.id);
    if (book) {
        res.json(book);
    }
    else {
        res.status(404).json({ message: 'Product not found' });
    }
});
exports.getBookById = getBookById;
// // @desc    Fetch all books
// // @route   GET /api/books
// // @access  Public
const getBooks = (0, express_async_handler_1.default)(async (req, res) => {
    //     const pageSize = process.env.PAGINATION_LIMIT;
    //     const page = Number(req.query.pageNumber) || 1;
    //     const keyword = req.query.keyword
    //         ? {
    //             name: {
    //                 $regex: req.query.keyword,
    //                 $options: 'i',
    //             },
    //         }
    //         : {};
    //     const count = await Book.countDocuments({ ...keyword });
    //     const books = await Book.find({ ...keyword })
    //         .limit(pageSize)
    //         .skip(pageSize * (page - 1));
    //     res.json({ books, page, pages: Math.ceil(count / pageSize) });
});
// @desc    Create a Book
// @route   POST /api/books
// @access  Private/Admin
const creatBook = (0, express_async_handler_1.default)(async (req, res) => {
    const book = new book_1.default({
        name: req.body.name,
        price: req.body.price,
        user: req.user._id,
        image: req.body.image,
        genre: req.body.genre,
        countInStock: req.body.countInStock,
        numReviews: req.body.numReviews, //ask
        description: req.body.description,
    });
    const creatBook = await book.save();
    res.status(201).json(creatBook);
});
exports.creatBook = creatBook;
// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, price, description, image, genre, countInStock } = req.body;
    const book = await book_1.default.findById(req.params.id);
    if (book) {
        book.name = name;
        book.price = price;
        book.description = description;
        book.image = image;
        book.genre = genre;
        book.countInStock = countInStock;
        const updatedBook = await book.save();
        res.json(updatedBook);
    }
    else {
        res.status(404);
        throw new Error('book not found');
    }
});
exports.updateBook = updateBook;
// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = (0, express_async_handler_1.default)(async (req, res) => {
    const book = await book_1.default.findById(req.params.id);
    if (book) {
        await book_1.default.deleteOne({ _id: book._id });
        res.json({ message: 'book removed' });
    }
    else {
        res.status(404);
        throw new Error('book not found');
    }
});
exports.deleteBook = deleteBook;
// @desc    Create new review
// @route   POST /api/books/:id/reviews
// @access  Private
const createBookReview = (0, express_async_handler_1.default)(async (req, res) => {
    const { rating, comment } = req.body;
    const book = await book_1.default.findById(req.params.id);
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
        await book.save();
        res.status(201).json({ message: 'Review added' });
    }
    else {
        res.status(404);
        throw new Error('book not found');
    }
});
exports.createBookReview = createBookReview;
// @desc    Get top rated books
// @route   GET /api/books/top
// @access  Public
const getTopbooks = (0, express_async_handler_1.default)(async (req, res) => {
    const books = await book_1.default.find({}).sort({ rating: -1 }).limit(6);
    res.json(books);
});
exports.getTopbooks = getTopbooks;
//# sourceMappingURL=book.js.map