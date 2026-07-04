// import React, { useState } from "react";
import { ShopContext } from "../context/ShopContext";
import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
    const [currentState, setCurrentState] = useState("Login");
    const {token,setToken,navigate,backendURL,user,setUser} = useContext(ShopContext);
    // console.log(import.meta.env.VITE_BACKEND_URL);
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const handleGoogleSuccess = async (credentialResponse) => {
    try {
            console.log("Backend URL:", backendURL);
            console.log("Request URL:", backendURL + "/api/user/google-login");
            const response = await axios.post(
                backendURL + "/api/user/google-login",
                {
                    token: credentialResponse.credential,
                }
            );

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setUser(response.data.user);
                toast.success("Logged in with Google");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Google Login Failed");
        }
    };
    const onSubmitHandler = async (event)=>{
        event.preventDefault();
        try {
            if(currentState==='SignUp'){
                const response = await axios.post(backendURL+"/api/user/register",{name,email,password});
                if(response.data.success){
                    setToken(response.data.token);
                    setUser(response.data.user);
                    localStorage.setItem("token",response.data.token);
                }else{
                    toast.error(response.data.message); 
                }
            }else{
                const response = await axios.post(backendURL+"/api/user/login",{email,password});
                if(response.data.success){
                    setToken(response.data.token);
                    setUser(response.data.user);
                    localStorage.setItem("token",response.data.token);
                    toast.success("Successful Login");
                    
                }else{
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(()=>{
    if (token) {
        navigate("/");
    }
    },[token])
    return (<>
        <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800" action="">
            <div className="inline-flex items-center gap-2 mb-2 mt-10">
                <p className="prata-regular text-3xl">
                    {currentState}
                </p>
                <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
            </div>
            {currentState==='Login'?"":<input onChange={(e)=>setName(e.target.value)} value={name}  required type="text" className="w-full px-3 py-2 border border-gray-800" placeholder="Name"/>}
            <input onChange={(e)=>setEmail(e.target.value)} value={email} required type="email" className="w-full px-3 py-2 border border-gray-800" placeholder="Email"/>
            <input onChange={(e)=>setPassword(e.target.value)} value={password}  required type="Password" className="w-full px-3 py-2 border border-gray-800" placeholder="Password"/>
            <div className="w-full flex justify-between text-sm mt-[-8px]">
                <p className="cursor-pointer">Forgot Your Passowrd?</p>
                {
                    currentState==='Login'?
                    <p className="cursor-pointer" onClick={()=>setCurrentState("SignUp")}>Create Account</p>:
                    <p className="cursor-pointer" onClick={()=>setCurrentState("Login")}>Login Here</p>
                }
            </div>
            <button className="bg-black text-white font-light px-12 py-2 mt-4">{currentState==='Login'?"Sign In":"SignUp"}</button>
                <div className="w-full flex justify-center mt-1">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => toast.error("Google Login Failed")}
                    />
                </div>
        </form>

    </>);
}

export default Login;