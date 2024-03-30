import express from 'express';
const router = express.Router();
import {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    createBookReview,
    getTopbooks
} from '../controllers/book';
import checkObjectId from '../middleware/checkObjectId';


router.route('/').get(getBooks).post(createBook);
router.route('/:id/reviews').post(checkObjectId, createBookReview);
router.get('/top', getTopbooks);

router
    .route('/:id')
    .get(checkObjectId, getBookById)
    .put(checkObjectId, updateBook)
    .delete(checkObjectId, deleteBook)

export default router;