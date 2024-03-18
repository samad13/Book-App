"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            book: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                required: true,
                ref: 'Book',
            },
        },
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String }
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date,
    },
}, {
    timestamps: true,
});
const Order = mongoose_1.default.model('Order', orderSchema);
exports.default = Order;
// import mongoose from 'mongoose';
// const orderSchema = new mongoose.Schema({
//     quantity: {
//         type: Number,
//         required: true
//     },
//     book: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Book'
//     },
//     totalItems: { type: Number, default: 0 },
// });
// const Order = mongoose.model('Order', orderSchema)
// export default Order
// import { Schema, model, Document, Types } from 'mongoose';
// interface MenuItem {
//   menuItem: Types.ObjectId;
//   name: string;
//   category: string;
//   quantity: number;
//   price: number;
//   subtotal: number;
// }
// interface Order extends Document {
//   table: number;
//   items: MenuItem[];
//   totalPrice: number;
//   orderStatus: string;
//   createdAt: Date;
// }
// const orderSchema = new Schema<Order>({
//   table: {
//     type: Number,
//     required: true,
//   },
//   items: [
//     {
//       menuItem: {
//         type: Schema.Types.ObjectId,
//         required: true,
//         ref: 'MenuItem',
//       },
//       name: {
//         type: String,
//         required: true,
//       },
//       category: {
//         type: String,
//         required: true,
//       },
//       quantity: {
//         type: Number,
//         required: true,
//         default: 1,
//       },
//       price: {
//         type: Number,
//         required: true,
//       },
//       subtotal: {
//         type: Number,
//         required: true,
//       },
//     },
//   ],
//   totalPrice: {
//     type: Number,
//     required: true,
//   },
//   orderStatus: {
//     type: String,
//     required: true,
//     default: 'Not started',
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });
// const OrderModel = model<Order>('Order', orderSchema);
// export default OrderModel;
//# sourceMappingURL=order.js.map