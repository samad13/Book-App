import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        pasword: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    }
});

export const BookModel = mongoose.model('Book', BookSchema)