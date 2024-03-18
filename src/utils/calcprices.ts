



function addDecimals(num: number): string {
    return (Math.round(num * 100) / 100).toFixed(2);
}

interface OrderItem {
    price: number;
    qty: number;
}

interface Prices {
    itemsPrice: string;
    shippingPrice: string;
    totalPrice: string;
}

export function calcPrices(orderItems: OrderItem[]): Prices {
    // Calculate the items price in whole number to avoid issues with
    // floating point number calculations
    const itemsPrice = orderItems.reduce(
        (acc, item) => acc + (item.price * 100 * item.qty) / 100,
        0
    );

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
