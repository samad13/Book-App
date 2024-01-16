import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        pasword: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    }
});

export const OrderModel = mongoose.model('Order', OrderSchema)