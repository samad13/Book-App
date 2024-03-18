"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const order_1 = require("../controllers/order");
router.route('/').post(order_1.addOrderItems).get(order_1.getOrders);
router.route('/mine').get(order_1.getMyOrders);
router.route('/:id').get(order_1.getOrderById);
router.route('/:id/pay').put(order_1.updateOrderToPaid);
router.route('/:id/deliver').put(order_1.updateOrderToDelivered);
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map