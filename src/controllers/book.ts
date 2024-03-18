import express, { Request, Response } from 'express';
import Book from '../models/book';
import asyncHandler from 'express-async-handler';

interface AuthenticatedRequest extends Request {
    user: { _id: string; name: string };
}
// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = asyncHandler(async (req: Request, res: Response) => {
    const book = await Book.findById(req.params.id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});





// // @desc    Fetch all books
// // @route   GET /api/books
// // @access  Public
const getBooks = asyncHandler(async (req: Request, res: Response) => {
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

    const count = await Book.countDocuments({ ...keyword });
    const books = await Book.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({ books, page, pages: Math.ceil(count / pageSize) });
});


// @desc    Create a Book
// @route   POST /api/books
// @access  Private/Admin
const createBook = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const book = new Book({
        name: req.body.name,
        price: req.body.price,
        user: req.user._id,
        image: req.body.image,
        genre: req.body.genre,
        countInStock: req.body.countInStock,
        numReviews: req.body.numReviews,//ask
        description: req.body.description,
    });

    const createdBook = await book.save();
    res.status(201).json(createBook);
});

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = asyncHandler(async (req: Request, res: Response) => {
    const { name, price, description, image, genre, countInStock } =
        req.body;

    const book = await Book.findById(req.params.id);

    if (book) {
        book.name = name;
        book.price = price;
        book.description = description;
        book.image = image;
        book.genre = genre;
        book.countInStock = countInStock;

        const updatedBook = await book.save();
        res.json(updatedBook);
    } else {
        res.status(404);
        throw new Error('book not found');
    }
});

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = asyncHandler(async (req: Request, res: Response) => {
    const book = await Book.findById(req.params.id);

    if (book) {
        await Book.deleteOne({ _id: book._id });
        res.json({ message: 'book removed' });
    } else {
        res.status(404);
        throw new Error('book not found');
    }
});

// @desc    Create new review
// @route   POST /api/books/:id/reviews
// @access  Private
const createBookReview = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { rating } = req.body;

    const book = await Book.findById(req.params.id);

    if (book) {
        const alreadyReviewed = book.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

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
    } else {
        res.status(404);
        throw new Error('book not found');
    }
});

// @desc    Get top rated books
// @route   GET /api/books/top
// @access  Public
const getTopbooks = asyncHandler(async (req: Request, res: Response) => {
    const books = await Book.find({}).sort({ rating: -1 }).limit(6);

    res.json(books);
});

export {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    createBookReview,
    getTopbooks
}
