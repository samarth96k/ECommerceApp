import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const Dashboard = ({ token }) => {

    const [dashboard, setDashboard] = useState(null);

    const fetchDashboard = async () => {

        try {

            const response = await axios.post(
                backendUrl + "/api/order/admin/dashboard",
                {},
                {
                    headers: { token }
                }
            );

            if (response.data.success) {

                setDashboard(response.data.dashboard);

            } else {

                toast.error(response.data.message);

            }

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message || error.message
            );

        }

    };

    useEffect(() => {

        if (token) {
            fetchDashboard();
        }

    }, [token]);

    if (!dashboard) {

        return <div className="p-8">Loading Dashboard...</div>;

    }

    return (
        <div className="p-8">

            <h1 className="text-3xl font-bold mb-8">
                Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <div className="bg-white shadow rounded-xl p-6">
                    <p className="text-gray-500">
                        Total Revenue
                    </p>
                    <h2 className="text-3xl font-bold mt-2">
                        {currency}{dashboard.totalRevenue}
                    </h2>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <p className="text-gray-500">
                        Online Revenue
                    </p>
                    <h2 className="text-3xl font-bold mt-2">
                        {currency}{dashboard.onlineRevenue}
                    </h2>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <p className="text-gray-500">
                        COD Revenue
                    </p>
                    <h2 className="text-3xl font-bold mt-2">
                        {currency}{dashboard.codRevenue}
                    </h2>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <p className="text-gray-500">
                        Total Orders
                    </p>
                    <h2 className="text-3xl font-bold mt-2">
                        {dashboard.totalOrders}
                    </h2>
                </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">

                <div className="bg-white shadow rounded-xl p-6">
                    <p className="text-gray-500">
                        Customers
                    </p>
                    <h2 className="text-3xl font-bold mt-2">
                        {dashboard.totalCustomers}
                    </h2>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <p className="text-gray-500">
                        Products
                    </p>
                    <h2 className="text-3xl font-bold mt-2">
                        {dashboard.totalProducts}
                    </h2>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <p className="text-gray-500">
                        Paid Orders
                    </p>
                    <h2 className="text-3xl font-bold text-green-600 mt-2">
                        {dashboard.paidOrders}
                    </h2>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <p className="text-gray-500">
                        Pending Payments
                    </p>
                    <h2 className="text-3xl font-bold text-red-600 mt-2">
                        {dashboard.pendingPayments}
                    </h2>
                </div>

            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8"><div className="bg-white shadow rounded-xl p-6">

                <h2 className="text-xl font-semibold mb-5">
                    ⚠ Low Stock Products
                </h2>

                {
                    dashboard.lowStockProducts.length === 0 ?

                        <p className="text-gray-500">
                            Everything is well stocked.
                        </p>

                        :

                        dashboard.lowStockProducts.map(product => (

                            <div
                                key={product._id}
                                className="flex justify-between border-b py-3"
                            >

                                <span>
                                    {product.name}
                                </span>

                                <span
                                    className={`font-bold ${product.stock <= 2
                                        ? "text-red-600"
                                        : "text-yellow-600"
                                        }`}
                                >
                                    {product.stock} left
                                </span>

                            </div>

                        ))

                }


            </div>
<div className="bg-white shadow rounded-xl p-6">

    <h2 className="text-xl font-semibold mb-5">
        🛒 Recent Orders
    </h2>

    {
        dashboard.recentOrders.map(order => (

            <div
                key={order._id}
                className="flex justify-between border-b py-3"
            >

                <div>

                    <p className="font-medium">

                        {order.address.firstName} {order.address.lastName}

                    </p>

                    <p className="text-sm text-gray-500">

                        {new Date(order.date).toLocaleDateString()}

                    </p>

                </div>

                <div className="text-right">

                    <p className="font-semibold">

                        {currency}{order.amount}

                    </p>

                    <p
                        className={`text-sm ${
                            order.payment
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >

                        {order.payment ? "Paid" : "Pending"}

                    </p>

                </div>

            </div>

        ))
    }

</div>
<div className="bg-white shadow rounded-xl p-6 mt-8">

    <h2 className="text-xl font-semibold mb-5">
        Monthly Sales
    </h2>

    {
        dashboard.monthlySales.length === 0 ?

        <p className="text-gray-500">
            No sales yet.
        </p>

        :

        dashboard.monthlySales.map((month) => (

            <div
                key={month.month}
                className="flex justify-between items-center border-b py-3"
            >

                <div>

                    <p className="font-medium">
                        {month.month}
                    </p>

                </div>

                <div className="text-right">

                    <p className="font-semibold">
                        {currency}{month.revenue}
                    </p>

                    <p className="text-sm text-gray-500">
                        {month.orders} Orders
                    </p>

                </div>

            </div>

        ))

    }

</div>
            </div>

        </div>
    );
};

export default Dashboard;