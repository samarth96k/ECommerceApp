import React, { useContext, useState } from "react";
import { Link, Navigate, NavLink  } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const [visible,setVisible] = useState(false);
    const {setShowSearch,getCartCount,navigate,token,setToken,setCartItems} = useContext(ShopContext);
    const logout = ()=>{
        navigate("/login");
        localStorage.removeItem("token");
        setToken("");
        setCartItems({});
    }
    return (
        <div className="flex items-center justify-between py-5 font-medium">
            <Link to="/"><p>FOREVER</p></Link>
            <ul className="hidden sm:flex gap-5 text-sm text-grey-700">
                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
                </NavLink>
                <NavLink to="/collection" className="flex flex-col items-center gap-1">
                    <p>COLLECTION</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
                </NavLink>
                <NavLink to="/about" className="flex flex-col items-center gap-1">
                    <p>ABOUT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
                </NavLink>
                <NavLink to="/contact" className="flex flex-col items-center gap-1">
                    <p>CONTACT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
                </NavLink>
            </ul>
            <div className="flex items-center gap-6">
                 <img onClick={()=>{setShowSearch(true)}} src="search-outline-svgrepo-com.svg" className="w-6 cursor-pointer" alt="" />
                 <div className="relative group">
                  
                    <img onClick={()=>token?null:navigate('/login')} src="profile-svgrepo-com.svg" className="w-6 cursor-pointer" alt="" />
                  {/*Dropdown*/}
                  {token &&                     
                  <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                        <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                            <p className="cursor-pointer hover:text-black" onClick={()=>navigate("/MyProfile")}>My Profile</p>
                            <p onClick={()=>navigate("/orders")} className="cursor-pointer hover:text-black">Orders</p>
                            <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
                        </div>
                    </div>
                    }

                 </div>
                 <Link to="/cart" className="relative">
                    <img src="shopping-cart-outline-svgrepo-com.svg" className="w-6 min-w-6" alt="" />
                    <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[11px]">{getCartCount()}</p>
                 </Link>
                 <img onClick={()=>setVisible(true)} src="menu-alt-2-svgrepo-com.svg" className="w-8 cursor-pointer sm:hidden" alt="" />
            </div>
            {/* Sidebar menu for small screen  */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible? 'w-full': 'w-0'}`}>
                <div className="flex flex-col text-gray-600">
                    <div onClick={()=>setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
                        <img className="h-4 rotate-90" src="dropdown-svgrepo-com.svg" alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={()=>{setVisible(false)}} to="/" className="py-2 pl-6 border">HOME</NavLink>
                    <NavLink onClick={()=>{setVisible(false)}} to="/collection" className="py-2 pl-6 border">COLLECTION</NavLink>
                    <NavLink onClick={()=>{setVisible(false)}} to="/about" className="py-2 pl-6 border">ABOUT</NavLink>
                    <NavLink onClick={()=>{setVisible(false)}} to="/contact" className="py-2 pl-6 border">CONTACT</NavLink>
                </div>
            </div>
        </div>
    );
}

export default NavBar;