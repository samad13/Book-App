import express from 'express';
const router = express.Router();
import {
    getBookById
} from '../controllers/book';
import checkObjectId from '../middleware/asyncHandler';


router
    .route('/:id')
    .get(checkObjectId, getBookById)


export default router;