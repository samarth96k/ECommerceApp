import React, { useContext, useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
function Product(){
    const {pdocutID} = useParams();
    const {products,currency,addToCart} = useContext(ShopContext);
    const [productsData,setProductsData]=useState(false);
    const [size,setSize] = useState("");
    const [image,setImage] = useState("");

    console.log(pdocutID);
    const fetchProductData = async()=>{
        products.map((item)=>{
            if(item._id==pdocutID){
                setProductsData(item);
                setImage(item.image[0]);
                return null;
            }
        })
    }
    useEffect(()=>{
        fetchProductData();
    },[pdocutID,products]);

    return productsData?(<>
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
            {/**Productsdata */}
            <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
                {/**product image */}
                <div className="flex-1 flex flex-col flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        {
                            productsData.image.map((item,index)=>(
                                <img onClick={()=>{
                                    setImage(item)
                                }} src={item} key={index} className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" alt="" />
                            ))
                        }
                    </div>
                    <div className="w-full sm:w[80%]">
                        <img src={image} className="w-full h-auto" alt="" />
                    </div>
                </div>
                {/**------------------product info----------------- */}
                <div className="flex-1">
                    <h1 className="font-medium text-2xl mt-2">{productsData.name}</h1>
                    <div className="flex items-center gap-1 mt-2">
                        <img src="/icons8-star-48.png" alt="" className="w-3.5" />
                        <img src="/icons8-star-48.png" alt="" className="w-3.5" />
                        <img src="/icons8-star-48.png" alt="" className="w-3.5" />
                        <img src="/icons8-star-48.png" alt="" className="w-3.5" />
                        <img src="/icons8-star-48 (1).png" alt="" className="w-3.5" />
                        <p className="pl-2">(122)</p>
                    </div>
                    <p className="mt-5 text-3xl font-medium">{currency}{productsData.price}</p>
                    <p className="mt-5 text-gray-500 md:w-4/5">{productsData.description}</p>
                    <div className="flex flex-col gap-4 my-8">
                        <p>Select Size</p>
                        <div className="flex gap-2">{productsData.sizes.map((item,index)=>(
                            <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-10 ${item===size?"border-orange-500":""}`} key={index}>{item}</button>
                        ))}
                        </div>
                    </div>
                    <button onClick={()=>addToCart(productsData._id,size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer" >ADD TO CART</button>
                    <hr className="mt-8 sm:4/5"/>
                    <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                        <p>100% Original Product</p>
                        <p>Cash On Delivery Available</p>
                        <p>Esy return and exchange policy in 7 days.</p>
                    </div>
                </div>
            </div>
            {/**------------------description and review section--------- */}
            <div className="mt-20">
                <div className="flex">
                    <b className="border px-5 py-3 text-sm">Description</b>
                    <p className="border px-5 py-3 text-sm">Reviews(122)</p>
                </div>
                <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quisquam incidunt repellat sapiente dolorum at ullam quibusdam veniam culpa? Nulla ex veritatis vel numquam sit, nemo doloremque necessitatibus dolor odit!</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores impedit nulla accusantium? Quis perferendis explicabo cupiditate hic, esse totam temporibus, in, unde dolore voluptas assumenda eum maxime quasi reiciendis quo!</p>
                </div>
            </div>
        </div>
    </>):<div className="opacity-0"></div>;
}

export default Product;