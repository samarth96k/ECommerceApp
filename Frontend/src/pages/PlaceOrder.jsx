import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";

function PlaceOrder() {
    const [method,setMethod] = useState("cod");
    const {navigate} = useContext(ShopContext);
    return (<>
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
            {/**-----------------LEFT SIDE------------------------ */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={"DELIVERY"} text2={"INFORMATION"}></Title>
                </div>
                <div className="flex gap-3">
                    <input type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="FIRST NAME" />
                    <input type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="LAST NAME" />
                </div>
                <input type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Email" />
                <input type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Street" />
                <div className="flex gap-3">
                    <input type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="City" />
                    <input type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="State" />
                </div>
                <div className="flex gap-3">
                    <input type="number" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Pincode" />
                    <input type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Country" />
                </div>
                <input type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Phone Number" />
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
                        <div onClick={()=>setMethod("stripe")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='stripe'?'bg-green-800':''}`}></p>
                            <img src="Stripe_Logo,_revised_2016.svg.png" alt="" className="h-5 mx-4"/>
                        </div>
                        <div onClick={()=>setMethod("razorpay")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='razorpay'?'bg-green-800':''}`}></p>
                            <img src="Razorpay_logo.svg" alt="" className="h-5 mx-4"/>
                        </div>
                        <div onClick={()=>setMethod("cod")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod'?'bg-green-800':''}`}></p>
                            <p className="text-gray-500 text-sm font-medium mx-4">Cash On Delivery</p>
                        </div>
                    </div>
                    <div className="w-full text-end mt-8">
                        <button onClick={()=>navigate("/orders")} className="bg-black text-white font-medium px-16 py-3">PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default PlaceOrder;