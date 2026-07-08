import React from "react";
import {Routes,Route} from "react-router-dom";
import Collection from "./pages/Collection.jsx";
import About from "./pages/About.jsx";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Orders from "./pages/Orders.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Product from "./pages/Product.jsx";
import NavBar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SearchBar from "./components/SearchBar.jsx";
// import Verify from "./pages/verify.jsx";
import { ToastContainer, toast } from 'react-toastify';
import MyProfilePage from "./pages/MyProfilePage.jsx"

const App = () =>{
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:pd-[9wv]">
      <ToastContainer />
      <NavBar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/collection" element={<Collection />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/product/:pdocutID" element={<Product />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/place-order" element={<PlaceOrder />}/>
        <Route path="/orders" element={<Orders />}/>
        {/* <Route path="/verify" element={<Verify />}/> */}
        <Route path="/MyProfile" element={<MyProfilePage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;