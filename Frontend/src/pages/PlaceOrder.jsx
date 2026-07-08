import React, { useContext, useState, useEffect } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

function PlaceOrder() {
    const [method, setMethod] = useState("cod");
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "", lastName: "", email: "", street: "",
        city: "", state: "", zipcode: "", country: "", phone: ""
    })
    const {
        navigate,
        backendURL,
        token,
        delivery_fee,
        availableItems,
        cartSummary,
        handleAuthError, user,getUserCartt
    } = useContext(ShopContext);

    useEffect(() => {

        if (!user?.addresses?.length) return;

        const defaultAddress =
            user.addresses.find(a => a.isDefault) ||
            user.addresses[0];

        setSelectedAddress(defaultAddress);

        fillAddress(defaultAddress);

    }, [user]);

    const fillAddress = (address) => {

        setFormData({

            firstName: address.fullName.split(" ")[0] || "",

            lastName: address.fullName.split(" ").slice(1).join(" "),

            email: user.email,

            street:
                `${address.houseNo}, ${address.street}`,

            city: address.city,

            state: address.state,

            zipcode: address.pincode,

            country: address.country,

            phone: address.phone

        });

    }
    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value

        setFormData(data => ({ ...data, [name]: value }));
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_Razorpay_Test_API_Key,
            amount: order.amount,
            currency: order.currency,
            name: "Order Payment",
            description: "Order Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(backendURL + "/api/order/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        await getUserCartt(token);
                        navigate("/orders");
                        // setCartItems({});
                    }
                } catch (error) {

                    if (handleAuthError(error)) return;

                    console.log(error);

                    toast.error(
                        error.response?.data?.message || error.message
                    );

                }
            }
        }
        const rzp = new window.Razorpay(options);
        rzp.open();
    }


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if (availableItems.length === 0) {
                toast.error("No items are currently available to order.");
                return;
            }
            const orderItems = availableItems.map(item => ({
                productId: item.productId,
                name: item.name,
                image: item.image,
                price: item.price,
                size: item.size,
                quantity: item.availableQuantity
            }));

            let orderData = {
                address: formData,
                items: orderItems,
                amount: cartSummary.availableSubtotal + delivery_fee, paymentMethod: method
            }
            switch (method) {
                //api calls for cod method
                case 'cod':
                    const response = await axios.post(backendURL + '/api/order/place', orderData, { headers: { token } });
                    if (response.data.success) {
                        navigate("/orders");
                    } else {
                        toast.error(response.data.message);
                    }
                    break;
                case "stripe":
                    const responseStripe = await axios.post(backendURL + "/api/order/stripe", orderData, { headers: { token } });
                    console.log("ORDER DATA");
                    console.log(JSON.stringify(orderData, null, 2));
                    if (responseStripe.data.success) {
                        const { session_url } = responseStripe.data;
                        window.location.replace(session_url);
                    } else {
                        toast.error(responseStripe.data.message);
                    }
                    break;
                case "razorpay":
                    const responseRazorpay = await axios.post(backendURL + "/api/order/razorpay", orderData, { headers: { token } });
                    if (responseRazorpay.data.success) {
                        initPay(responseRazorpay.data.order);
                    }
                    break;
                default:
                    break;
            }
        } catch (error) {

            if (handleAuthError(error)) return;

            console.log(error);

            toast.error(
                error.response?.data?.message || error.message
            );

        }finally{
            getUserCartt(token);
        }
    }

    return (<>
        <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
            {/**-----------------LEFT SIDE------------------------ */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={"DELIVERY"} text2={"INFORMATION"}></Title>
                </div>

                <div className="flex gap-3">
                    <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="FIRST NAME" />
                    <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="LAST NAME" />
                </div>
                <input required onChange={onChangeHandler} name="email" value={formData.email} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Email" />
                <input required onChange={onChangeHandler} name="street" value={formData.street} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Street" />
                <div className="flex gap-3">
                    <input required onChange={onChangeHandler} name="city" value={formData.city} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="City" />
                    <input required onChange={onChangeHandler} name="state" value={formData.state} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="State" />
                </div>
                <div className="flex gap-3">
                    <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} type="number" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Pincode" />
                    <input required onChange={onChangeHandler} name="country" value={formData.country} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Country" />
                </div>
                <input required onChange={onChangeHandler} name="phone" value={formData.phone} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Phone Number" />


                {
                    user?.addresses?.length > 0 && (

                        <div className="mb-6">

                            <p className="font-medium mb-3">
                                Saved Addresses
                            </p>

                            <div className="flex flex-row gap-2">

                                {
                                    user.addresses.map((address, index) => (

                                        <div
                                            key={index}
                                            onClick={() => {

                                                setSelectedAddress(address);

                                                fillAddress(address);

                                            }}
                                            className={`border rounded p-4 cursor-pointer
                                ${selectedAddress === address
                                                    ? "border-black bg-gray-50"
                                                    : "border-gray-300"
                                                }`}
                                        >

                                            <p className="font-medium">
                                                {address.addressType}
                                                {address.isDefault && " (Default)"}
                                            </p>

                                            <p>{address.fullName}</p>

                                            <p>
                                                {address.houseNo}, {address.street}
                                            </p>

                                            <p>
                                                {address.city}, {address.state}
                                            </p>

                                            <p>{address.phone}</p>

                                        </div>

                                    ))
                                }

                            </div>

                        </div>

                    )
                }
            </div>

            {/**---------RIGHT SIDE------------ */}
            <div className="mt-8">
                <div className="mt-8 min-w-80">
                    <CartTotal />
                </div>
                <div className="mt-12">
                    <Title text1={"PAYEMENT"} text2={"METHOD"}></Title>
                    {/** ----------------PAYEMENT METHOD SELECTION---------- */}
                    <div className="flex gap-3 flex-col lg:flex-row">
                        <div onClick={() => setMethod("stripe")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-800' : ''}`}></p>
                            <img src="Stripe_Logo,_revised_2016.svg.png" alt="" className="h-5 mx-4" />
                        </div>
                        <div onClick={() => setMethod("razorpay")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-800' : ''}`}></p>
                            <img src="Razorpay_logo.svg" alt="" className="h-5 mx-4" />
                        </div>
                        <div onClick={() => setMethod("cod")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-800' : ''}`}></p>
                            <p className="text-gray-500 text-sm font-medium mx-4">Cash On Delivery</p>
                        </div>
                    </div>
                    <div className="w-full text-end mt-8">
                        <button type="submit" className="bg-black text-white font-medium px-16 py-3">PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </form>
    </>);
}

export default PlaceOrder;