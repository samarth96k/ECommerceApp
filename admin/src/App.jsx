import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { useState } from 'react';
import Login from './components/Login';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import Dashboard  from './pages/Dashboard';
import { ToastContainer, toast } from 'react-toastify';
export const currency = '$';
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):"");
  useEffect(()=>{
    localStorage.setItem("token",token);
  })
  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken}/>
        :
        <><Navbar setToken={setToken}></Navbar>
          <hr />
          <div className='flex w-full'>
            <SideBar />
            <div className='w-[70%] mx-auto p-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path="/" element={<Add token={token}/>} /> 
                <Route path="/add" element={<Add token={token}/>} />
                <Route path="/list" element={<List token={token}/>}></Route>
                <Route path="/orders" element={<Orders token={token}/>}></Route>
                <Route path="/dashboard" element={<Dashboard token={token}/>} /> 
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export {backendUrl};
export default App