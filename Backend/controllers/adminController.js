import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
import logger from "../utils/logger.js";

const getDashboardData = async (req, res) => {
    try {
        const [
            orders,
            products,
            users
        ] = await Promise.all([
            orderModel.find({}),
            productModel.find({}),
            userModel.find({})
        ]);
        const totalOrders = orders.length;

        const totalProducts = products.length;

        const totalCustomers = users.length;
        //to be editted
        const onlineOrders = orders.filter(
            order => order.paymentMethod !== "COD"
        ).length;

        const codOrders = orders.filter(
            order => order.paymentMethod === "COD"
        ).length;

        const paidOrders = orders.filter(
            order => order.payment
        ).length;

        const pendingPayments = orders.filter(
            order => !order.payment
        ).length;

        const onlineRevenue = orders
            .filter(order =>
                order.paymentMethod !== "COD" &&
                order.payment
            )
            .reduce((sum, order) => sum + order.amount, 0);
const recentOrders = orders
    .sort((a, b) => b.date - a.date)
    .slice(0, 5);
        const codRevenue = orders
            .filter(order =>
                order.paymentMethod === "COD" &&
                order.payment
            )
            .reduce((sum, order) => sum + order.amount, 0);

        const totalRevenue = onlineRevenue + codRevenue;
        const monthlyStats = {};
for (const order of orders) {

    if (!order.payment) continue;

    const month = new Date(order.date).toLocaleString(
        "default",
        {
            month: "short",
            year: "numeric"
        }
    );

    if (!monthlyStats[month]) {

        monthlyStats[month] = {
            orders: 0,
            revenue: 0
        };

    }

    monthlyStats[month].orders++;

    monthlyStats[month].revenue += order.amount;

}
        const lowStockProducts = products.filter(
            product => product.stock <= 5
        );
        const monthlySales = Object.entries(monthlyStats).map(
    ([month, data]) => ({
        month,
        ...data
    })
);
        return res.json({

            success: true,

            dashboard: {
                onlineOrders,monthlySales,
                codOrders,
                paidOrders,
                pendingPayments,
                totalCustomers,
                totalProducts,
                lowStockProducts,
                totalOrders,onlineRevenue,
                codRevenue, totalRevenue,recentOrders
            }

        });
    }
    catch (error) {

        logger.error(error);

        return res.json({
            success: false,
            message: error.message
        });

    }
}

const updateCODPayment = async (req, res) => {
    try {

        const { orderId, payment } = req.body;

        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.json({
                success: false,
                message: "Order not found"
            });
        }

        if (order.paymentMethod !== "COD") {
            return res.json({
                success: false,
                message: "Only COD orders can be updated."
            });
        }

        order.payment = payment;

        order.paidAt = payment ? new Date() : null;

        await order.save();

        return res.json({
            success: true,
            message: "Payment status updated."
        });

    } catch (error) {

        logger.error(error);

        return res.json({
            success: false,
            message: error.message
        });

    }
};

export {updateCODPayment,getDashboardData};