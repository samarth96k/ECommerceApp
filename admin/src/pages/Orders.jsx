import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import parcel_icon from "../assets/parcel_icon.svg";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    if (!token) { return null };
    try {
      const response = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  }
  const statusHandler = async (e, orderId) => {
    try {
      const resposne = await axios.post(backendUrl + "/api/order/status", { orderId, status: e.target.value }, { headers: { token } });
      if (resposne.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data.message)
    }
  }
  const codPaymentHandler = async (e, orderId) => {

    try {

      const payment = e.target.value === "Paid";

      const response = await axios.post(
        backendUrl + "/api/order/updateCODPayment",
        {
          orderId,
          payment
        },
        {
          headers: { token }
        }
      );

      if (response.data.success) {

        toast.success(response.data.message);

        await fetchAllOrders();

      } else {

        toast.error(response.data.message);

      }

    } catch (error) {

      console.log(error);

      toast.error(error.response?.data?.message || error.message);

    }

  }

  const cancelOrder = async (orderId) => {

    const confirmCancel = window.confirm(
        "Are you sure you want to cancel this order?\n\nThis will restore the stock and cannot be undone."
    );

    if (!confirmCancel) return;

    try {

        const response = await axios.post(
            backendUrl + "/api/order/cancel",
            { orderId },
            {
                headers: { token }
            }
        );

        if (response.data.success) {

            toast.success(response.data.message);

            await fetchAllOrders();

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
    fetchAllOrders();
  }, [token])
  return (
    <div>
      <h3 className='mt-1 mb-5 text-lg'>ORDER PAGE</h3>
      <div>
        {
          orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 sm:text-sm text-gray-700' key={index}>
              <img className="w-12" src={parcel_icon} alt="" />
              <div>
                <div>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return <p className='py-0.5' key={index}>{item.name} X {item.quantity} <span>Size: {item.size}</span></p>
                    } else {
                      return <p className='py-0.5' key={index}>{item.name} X {item.quantity} <span>Size: {item.size},</span></p>
                    }
                  })}
                </div>
                <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ", "}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <div>{order.address.phone}</div>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
                <p className='mt-3'>Method: {order.paymentMethod}</p>
                <p>Payment:{order.payment ? "Payment Done" : "Pending"}</p>
                <p>Date:{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
                <select disabled={order.status === "Cancelled"} onChange={(e) => statusHandler(e, order._id)} value={order.status} className='p-2 font-semibold'>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipping">In Transit</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                {
                  order.paymentMethod === "COD" && (
                    <select
                      className="p-2 font-semibold mt-2"
                      value={order.payment ? "Paid" : "Not Paid"}
                      onChange={(e) => codPaymentHandler(e, order._id)}
                      disabled={order.status === "Cancelled"}
                    >
                      <option value="Not Paid">Not Paid</option>
                      <option value="Paid">Paid</option>
                    </select>
                  )
                }
                <div className="flex items-center gap-2 mt-2">

                  <span
                    className={`w-2.5 h-2.5 rounded-full ${order.payment
                      ? "bg-green-500"
                      : "bg-red-500"
                      }`}
                  ></span>

                  <span
                    className={`font-medium ${order.payment
                      ? "text-green-600"
                      : "text-red-600"
                      }`}
                  >
                    {order.payment ? "Paid" : "Not Paid"}
                  </span>

                </div>
              </div>
              {
                order.status !== "Cancelled" && (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="mt-3 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm"
                  >
                    Cancel Order
                  </button>
                )
              }

              {
                order.status === "Cancelled" && (
                  <p className="mt-2 mr-2 text-red-600 font-semibold cursor-pointer">
                    ❌ Order Cancelled
                  </p>
                )
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders