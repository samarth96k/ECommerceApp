import React from 'react'
import axios from 'axios';
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const Verify = () => {
    const {navigate,token,setCartItems} = useContext(ShopContext);
    const [searchParams,setSearchParams] = useSearchParams();

    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");

    const verifyPayment = async()=>{
        try {
            if(!token){
                return null;
            }
            const response = await axios.post(backendUrl+"/api/order/verifyStripe",{success,orderId},{headers:{token}});
            if(response.data.success){
                setCartItems({});
                navigate("/orders");
            }else{
                navigate("/cart");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[token]);

    return (
    <div>
        
    </div>
  )
}

export default Verify;