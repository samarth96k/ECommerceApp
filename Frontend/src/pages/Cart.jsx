import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title"
import CartTotal from "../components/CartTotal";
function Cart() {
    const {
        currency,
        updateQuantity,
        navigate,
        availableItems,
        unavailableItems
    } = useContext(ShopContext);

    return (<>
        <div className="border-t pt-14">
            <div className="text-2xl mb-3">
                <Title text1={"YOUR"} text2={"CART  "} />
            </div>

            <div>
                {
                    availableItems.map((item, index) => {
                        return (
                            <div key={index} className="py-4 border-t border-b text-gray-700 grid grid-cols[-4fr0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                                <div className="flex items-start gap-6">
                                    <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
                                    <div>
                                        <p className="text-xs sm:text-lg font-medium">{item.name}</p>
                                        <div className="flex items-center gap-5 mt-2">
                                            <p>{currency}{item.price}</p>
                                            <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                                        </div>
                                    </div>
                                </div>
                                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item.productId, item.size, Number(e.target.value))} className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1" type="number" min={1} defaultValue={item.availableQuantity} />
                                <img onClick={() => updateQuantity(item.productId, item.size, 0)} className="w-6 mr-4 sm:w-7 cursor-pointer" src="/trash-can.png" alt="" />
                            </div>
                        )
                    })
                }
            </div>
            {
                unavailableItems.length > 0 && (

                    <div className="mt-14">

                        <div className="text-2xl mb-4">

                            <Title
                                text1={"CURRENTLY"}
                                text2={"UNAVAILABLE"}
                            />

                        </div>

                        {
                            unavailableItems.map((item, index) => (

                                <div
                                    key={index}
                                    className="py-4 border-t border-b text-gray-500 grid grid-cols-[4fr_0.7fr] sm:grid-cols-[4fr_1fr] items-center gap-4"
                                >

                                    <div className="flex items-start gap-6">

                                        <img
                                            className="w-16 sm:w-20 opacity-70"
                                            src={item.image[0]}
                                            alt=""
                                        />

                                        <div>

                                            <p className="text-xs sm:text-lg font-medium">

                                                {item.name}

                                            </p>

                                            <div className="flex items-center gap-5 mt-2">

                                                <p>
                                                    {currency}{item.price}
                                                </p>

                                                <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">

                                                    {item.size}

                                                </p>

                                            </div>

                                            {
                                                item.availableQuantity > 0 ?

                                                    <div className="mt-3 text-red-600 text-sm">

                                                    
                                                        Only {item.availableQuantity} available.

                                                    </div>

                                                    :

                                                    <div className="mt-3 text-red-600 text-sm">

                                                        ❌ Out of Stock

                                                    </div>

                                            }
<img
    onClick={() =>
        updateQuantity(item.productId, item.size, 0)
    }
    className="w-3 mt-1 cursor-pointer"
    src="/trash-can.png"
    alt=""
/>
                                        </div>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                )
            }
            <div className='flex justify-end my-20'>
                <div className="w-full sm:w-[450px]">
                    <CartTotal />
                    <div className="w-full text-end">
                     <button
    disabled={availableItems.length === 0}
    onClick={() => navigate("/place-order")}
    className={`text-sm my-8 px-8 py-3 ${
        availableItems.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black text-white cursor-pointer"
    }`}
>
    PROCEED TO CHECKOUT ({availableItems.length} ITEMS)
</button>                   </div>
                </div>
            </div>

        </div>
    </>);
}

export default Cart;