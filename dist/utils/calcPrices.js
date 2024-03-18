"use strict";
// gfunction addDecimals(num) {
//     return (Math.round(num * 100) / 100).toFixed(2);
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcPrices = void 0;
// export function calcPrices(orderItems: number) {
//     // Calculate the items price in whole number (pennies) to avoid issues with
//     // floating point number calculations
//     const itemsPrice = orderItems.reduce(
//         (acc, item) => acc + (item.price * 100 * item.qty) / 100,
//         0
//     );
//     // Calculate the shipping price
//     const shippingPrice = itemsPrice > 100 ? 0 : 10;
//     // Calculate the total price
//     const totalPrice = itemsPrice + shippingPrice;
//     // return prices as strings fixed to 2 decimal places
//     return {
//         itemsPrice: addDecimals(itemsPrice),
//         shippingPrice: addDecimals(shippingPrice),
//         totalPrice: addDecimals(totalPrice),
//     };
// }
function addDecimals(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
}
function calcPrices(orderItems) {
    // Calculate the items price in whole number (pennies) to avoid issues with
    // floating point number calculations
    const itemsPrice = orderItems.reduce((acc, item) => acc + (item.price * 100 * item.qty) / 100, 0);
    // Calculate the shipping price
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    // Calculate the total price
    const totalPrice = itemsPrice + shippingPrice;
    // return prices as strings fixed to 2 decimal places
    return {
        itemsPrice: addDecimals(itemsPrice),
        shippingPrice: addDecimals(shippingPrice),
        totalPrice: addDecimals(totalPrice),
    };
}
exports.calcPrices = calcPrices;
//# sourceMappingURL=calcPrices.js.map