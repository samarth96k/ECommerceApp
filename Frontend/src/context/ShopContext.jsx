import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
// import { products } from "../assets/assets";
export const ShopContext = createContext();
import axios from "axios";
import { toast } from "react-toastify";
const ShopContextProvider = (props) => {

    const currency = "$"; //this can be used to change currency symbol on complete website
    const delivery_fee = 10;
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [availableItems, setAvailableItems] = useState([]);
    const [unavailableItems, setUnavailableItems] = useState([]);
    const [cartSummary, setCartSummary] = useState({
        availableSubtotal: 0,
        unavailableSubtotal: 0,
        availableItemsCount: 0,
        unavailableItemsCount: 0
    });
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const logoutUser = () => {

        localStorage.removeItem("token");

        setToken("");

        setUser(null);

        setCartItems({});

        toast.info("Session expired. Please login again.");

        navigate("/login");

    }
    const handleAuthError = (error) => {

        if (
            error.response &&
            error.response.status === 401 &&
            error.response.data.expired
        ) {

            logoutUser();

            return true;

        }

        return false;

    }
    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error("Select ProductSize");
            return;
        }
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendURL + "/api/cart/add", { itemId, size }, { headers: { token } });
                await getUserCartt(token);
            } catch (error) {

                if (handleAuthError(error)) return;

                console.log(error);

                toast.error(
                    error.response?.data?.message || error.message
                );

            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if (token) {

            try {
                await axios.post(backendURL + "/api/cart/update", { itemId, size, quantity }, { headers: { token } });
                await getUserCartt(token);
            } catch (error) {

                if (handleAuthError(error)) return;

                console.log(error);

                toast.error(
                    error.response?.data?.message || error.message
                );

            }

        }
    }

    const getProductData = async () => {
        try {
            const response = await axios.get(backendURL + "/api/product/list");
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const getUserCartt = async (token) => {
        try {
            const response = await axios.post(backendURL + "/api/cart/get", {}, { headers: { token } })
            if (response.data.success) {

                setCartItems(response.data.cartData);

                setAvailableItems(response.data.availableItems);

                setUnavailableItems(response.data.unavailableItems);

                setCartSummary(response.data.summary);

            }

        } catch (error) {

            if (handleAuthError(error)) return;

            console.log(error);

            toast.error(
                error.response?.data?.message || error.message
            );

        }
    }

    const loadUser = async (token) => {
        try {

            const response = await axios.post(
                backendURL + "/api/user/profile",
                {},                  // Empty request body
                {
                    headers: {
                        token
                    }
                }
            );

            if (response.data.success) {

                setUser(response.data.user);

            } else {

                toast.error(response.data.message);

            }

        } catch (error) {

            if (handleAuthError(error)) return;

            console.log(error);

            toast.error(
                error.response?.data?.message || error.message
            );

        }

    }
    useEffect(() => {
        getProductData();
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            getUserCartt(storedToken);
            loadUser(storedToken);
        }

    }, []);

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

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity, getCartAmount, navigate, backendURL,
        token, setToken, user, setUser, handleAuthError, availableItems,
        setAvailableItems,
        unavailableItems,
        setUnavailableItems,
        cartSummary,
        setCartSummary,
        logoutUser,getUserCartt
    };
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;