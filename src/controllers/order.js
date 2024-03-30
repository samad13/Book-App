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
exports.getOrders = exports.updateOrderToDelivered = exports.updateOrderToPaid = exports.getOrderById = exports.getMyOrders = exports.addOrderItems = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const order_1 = __importDefault(require("../models/order"));
const book_1 = __importDefault(require("../models/book"));
const calcPrices_1 = require("../utils/calcPrices");
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderItems, shippingAddress, paymentMethod } = req.body;
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    }
    else {
        // get the ordered items from our database
        const itemsFromDB = yield book_1.default.find({
            _id: { $in: orderItems.map((x) => x._id) },
        });
        // map over the order items and use the price from our items from database
        const dbOrderItems = orderItems.map((itemFromClient) => {
            const matchingItemFromDB = itemsFromDB.find((itemFromDB) => itemFromDB._id.toString() === itemFromClient._id);
            return Object.assign(Object.assign({}, itemFromClient), { book: itemFromClient._id, price: matchingItemFromDB.price, _id: undefined });
        });
        // calculate prices
        const { itemsPrice, shippingPrice, totalPrice } = (0, calcPrices_1.calcPrices)(dbOrderItems);
        const order = new order_1.default({
            orderItems: dbOrderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
        });
        const createdOrder = yield order.save();
        res.status(201).json(createdOrder);
    }
}));
exports.addOrderItems = addOrderItems;
// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_1.default.find({ user: req.user._id });
    res.json(orders);
}));
exports.getMyOrders = getMyOrders;
// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_1.default.findById(req.params.id).populate('user', 'name email');
    if (order) {
        res.json(order);
    }
    else {
        res.status(404);
        throw new Error('Order not found');
    }
}));
exports.getOrderById = getOrderById;
// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // NOTE: here we need to verify the payment was made before marking
    // the order as paid
    const { verified, value } = yield verifyPayPalPayment(req.body.id);
    if (!verified)
        throw new Error('Payment not verified');
    // check if this transaction has been used before
    const isNewTransaction = yield checkIfNewTransaction(order_1.default, req.body.id);
    if (!isNewTransaction)
        throw new Error('Transaction has been used before');
    const order = yield order_1.default.findById(req.params.id);
    if (order) {
        // check the correct amount was paid
        const paidCorrectAmount = order.totalPrice.toString() === value;
        if (!paidCorrectAmount)
            throw new Error('Incorrect amount paid');
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };
        const updatedOrder = yield order.save();
        res.json(updatedOrder);
    }
    else {
        res.status(404);
        throw new Error('Order not found');
    }
}));
exports.updateOrderToPaid = updateOrderToPaid;
// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_1.default.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = yield order.save();
        res.json(updatedOrder);
    }
    else {
        res.status(404);
        throw new Error('Order not found');
    }
}));
exports.updateOrderToDelivered = updateOrderToDelivered;
// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_1.default.find({}).populate('user', 'id name');
    res.json(orders);
}));
exports.getOrders = getOrders;
