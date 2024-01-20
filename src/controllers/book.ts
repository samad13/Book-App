import express, { Request, Response } from 'express';
import Book from '../models/book';
import asyncHandler from '../middleware/asyncHandler'


// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = asyncHandler(async (req: Request, res: Response) => {
    const book = await Book.findById(req.params.id);
    if (book) {
        return res.json(book);
    } else {
        return res.status(404).json({ message: 'Product not found' });
    }
});

export {
    getBookById
}




