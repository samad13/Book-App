import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    isAdmin: { type: String, required: true, default: false },
},
    {
        timestamps: true
    }
);

export const User = mongoose.model('User', userSchema)

