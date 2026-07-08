import productModel from "../models/productModel.js";

export const processCart = async (cartData) => {

    const availableItems = [];
    const unavailableItems = [];

    let availableSubtotal = 0;
    let unavailableSubtotal = 0;

    let availableItemsCount = 0;
    let unavailableItemsCount = 0;
    const productIds = Object.keys(cartData);

    const products = await productModel.find({
        _id: { $in: productIds }
    });

    const productMap = new Map();

    products.forEach((product) => {
        productMap.set(product._id.toString(), product);
    });
    for (const productId in cartData) {
        const product = productMap.get(productId);
        if (!product) continue;

        let remainingStock = product.stock;

        const sizes = cartData[productId];

        for (const size in sizes) {

            const requestedQuantity = sizes[size];

            if (requestedQuantity <= 0) continue;

            const availableQuantity = Math.min(
                requestedQuantity,
                remainingStock
            );

            const unavailableQuantity =
                requestedQuantity - availableQuantity;

            if (availableQuantity > 0) {

                availableItems.push({

                    productId: product._id,

                    name: product.name,

                    image: product.image,

                    size,

                    price: product.price,

                    stock: product.stock,

                    requestedQuantity,

                    availableQuantity,

                    unavailableQuantity,

                    totalPrice:
                        availableQuantity * product.price

                });

                remainingStock -= availableQuantity;

                availableSubtotal +=
                    availableQuantity * product.price;

                availableItemsCount += availableQuantity;
            }

            if (unavailableQuantity > 0) {

                unavailableItems.push({

                    productId: product._id,

                    name: product.name,

                    image: product.image,

                    size,

                    price: product.price,

                    stock: product.stock,

                    requestedQuantity,

                    availableQuantity,

                    unavailableQuantity,

                    totalPrice:
                        unavailableQuantity * product.price

                });

                unavailableSubtotal +=
                    unavailableQuantity * product.price;

                unavailableItemsCount += unavailableQuantity;
            }
        }
    }

    return {

        availableItems,

        unavailableItems,

        summary: {

            availableSubtotal,

            unavailableSubtotal,

            availableItemsCount,

            unavailableItemsCount

        }

    };

};