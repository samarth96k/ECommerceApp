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

const App = () =>{
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:pd-[9wv]">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/collection" element={<Collection />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/product/:pdocutID" element={<Product />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/placeOrder" element={<PlaceOrder />}/>
        <Route path="/orders" element={<Orders />}/>
      </Routes>
    </div>
  )
}

export default App;