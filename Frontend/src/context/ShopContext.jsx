import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { products } from "../assets/assets";
export const ShopContext = createContext();
import {toast} from "react-toastify";
const ShopContextProvider=(props) =>{

    const currency = "$"; //this can be used to change currency symbol on complete website
    const delivery_fee=10;
    const [search,setSearch] = useState("");
    const [showSearch,setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState({});
    const navigate = useNavigate();

    const addToCart = async(itemId,size)=>{

        if(!size){
            toast.error("Select ProductSize");
            return ;
        }
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }else{
                cartData[itemId][size]=1;
            }
        }else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
        setCartItems(cartData);
    }

    const getCartCount = ()=>{
        let totalCount = 0;
        for(const items in cartItems) {
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        totalCount+=cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async(itemId,size,quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;

        setCartItems(cartData);
    }

    // const getCartAmount = ()=>{
    //     let totalAmount = 0;
    //     for(const items in cartItems){
    //         let itemInfo = products.find((product)=>product._id===items);
    //         for(const item in itemInfo[items]){
    //             try{
    //                 if(cartItems[items][item]>0){
    //                     totalAmount += itemInfo.price*cartItems[items][item];
    //                 }
    //             }catch(error){

    //             }
    //         }
    //     }
    //     return totalAmount;
    // }

const getCartAmount = () => {
    let totalAmount = 0;

    for (const productId in cartItems) {

        const itemInfo = products.find(
            (product) => product._id === productId
        );

        if (!itemInfo) continue;

        for (const size in cartItems[productId]) {

            const quantity = cartItems[productId][size];

            if (quantity > 0) {
                totalAmount += itemInfo.price * quantity;
            }
        }
    }

    return totalAmount;
};

    const value={
        products,currency,delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,
        getCartCount,updateQuantity,getCartAmount,navigate
    };
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;