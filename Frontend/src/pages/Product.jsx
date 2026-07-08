import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

function Product() {
    const { pdocutID } = useParams();
    const {
        products,
        currency,
        addToCart,
        token,
        backendURL,
        user,handleAuthError
    } = useContext(ShopContext);
    const [productsData, setProductsData] = useState(false);
    const [size, setSize] = useState("");
    const [image, setImage] = useState("");
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [sortBy, setSortBy] = useState("Newest");
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("reviews");
    const [aiSummary, setAiSummary] = useState("");
    const [loadingSummary, setLoadingSummary] = useState(false);
    const [summaryFetched, setSummaryFetched] = useState(false);
    const [displayedSummary, setDisplayedSummary] = useState("");
    useEffect(() => {
        if (productsData && user) {

            const existing = productsData.reviews?.find(
                item => item.userId === user._id
            );

            if (existing) {
                setRating(existing.rating);
                setReview(existing.review);
            }

        }
    }, [productsData, user]);


    const submitReview = async () => {
        if (review.trim() === "") {
            toast.error("Review cannot be empty");
            return;
        }
        if (!token) {
            toast.error("Please login");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(

                backendURL + "/api/product/review",
                {
                    productId: productsData._id,
                    rating,
                    review
                },
                {
                    headers: { token }
                }
            );

            if (response.data.success) {

                toast.success(response.data.message);

                setProductsData(response.data.product);
            }
            else {

                toast.error(response.data.message);

            }

        }
        catch (error) {

    if(handleAuthError(error)) return;

    console.log(error);

    toast.error(
        error.response?.data?.message || error.message
    );

} finally {
            setLoading(false);
        }

    }

    const deleteReview = async () => {
        if(!window.confirm("Delete your review?")){
        return;
    }
        try {

            const response = await axios.post(
                backendURL + "/api/product/delete-review",
                {
                    productId: productsData._id
                },
                {
                    headers: { token }
                }
            );

            if (response.data.success) {

                toast.success("Review Deleted");

                setRating(5);

                setReview("");

                setProductsData(response.data.product);

            }

        }
        catch (error) {

    if(handleAuthError(error)) return;

    console.log(error);

    toast.error(
        error.response?.data?.message || error.message
    );

}

    }
    console.log(pdocutID);
    const fetchProductData = async () => {
        products.map((item) => {
            if (item._id == pdocutID) {
                setProductsData(item);
                setImage(item.image[0]);
                return null;
            }
        })
    }
    
    const loadAISummary = async () => {

        setActiveTab("summary");

        if(summaryFetched){
            setDisplayedSummary(aiSummary);
            return;
        }

        try{

            setLoadingSummary(true);

            const response = await axios.post(

                backendURL + "/api/product/review-summary",

                {
                    productId: productsData._id
                }

            );

            if(response.data.success){

setAiSummary(response.data.summary);

animateSummary(response.data.summary);

setSummaryFetched(true);

            }
            else{

                toast.error(response.data.message);

            }

        }
        catch(error){

            console.log(error);

            toast.error(error.message);

        }
        finally{

            setLoadingSummary(false);

        }

    }

    const animateSummary = (text) => {

    setDisplayedSummary("");

    const words = text.split(" ");

    let index = 0;

    const interval = setInterval(() => {

        setDisplayedSummary(prev => {

            if(index >= words.length){

                clearInterval(interval);

                return prev;

            }

            return prev + (prev ? " " : "") + words[index++];

        });

    }, 45);

}

    useEffect(() => {
        fetchProductData();
    }, [pdocutID, products]);

    return productsData ? (<>
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
            {/**Productsdata */}
            <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
                {/**product image */}
                <div className="flex-1 flex flex-col flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        {
                            productsData.image.map((item, index) => (
                                <img onClick={() => {
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
                        <div className="flex items-center gap-1 mt-2">
                            {
                                [...Array(5)].map((_, index) => (
                                    <span
                                        key={index}
                                        className="text-yellow-500 text-lg"
                                    >
                                        {index < Math.round(productsData.averageRating) ? "★" : "☆"}
                                    </span>
                                ))
                            }

                            <p className="pl-2">
                                {productsData.averageRating.toFixed(1)}
                                {" "}
                                ({productsData.totalReviews} Reviews)
                            </p>
                        </div>
                    </div>
                    <p className="mt-5 text-3xl font-medium">{currency}{productsData.price}</p>
                    {
    productsData.stock === 0 ? (
        <p className="mt-2 text-red-600 font-medium">
            Out of Stock
        </p>
    ) : productsData.stock <= 5 ? (
        <p className="mt-2 text-red-600 font-medium">
            Only {productsData.stock} left
        </p>
    ) : null
}
                    <p className="mt-5 text-gray-500 md:w-4/5">{productsData.description}</p>
                    <div className="flex flex-col gap-4 my-8">
                        <p>Select Size</p>
                        <div className="flex gap-2">{productsData.sizes.map((item, index) => (
                            <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-10 ${item === size ? "border-orange-500" : ""}`} key={index}>{item}</button>
                        ))}
                        </div>
                        <p>Color: </p> {productsData.color}
                    </div>
<button
    disabled={productsData.stock === 0}
    onClick={() => addToCart(productsData._id, size)}
    className={`px-8 py-3 text-sm
        ${
            productsData.stock === 0
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-black text-white active:bg-gray-700 cursor-pointer"
        }`}
>
    {
        productsData.stock === 0
            ? "OUT OF STOCK"
            : "ADD TO CART"
    }
</button>                    <hr className="mt-8 sm:4/5" />
                    <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                        <p>100% Original Product</p>
                        <p>Cash On Delivery Available</p>
                        <p>Easy return and exchange policy in 7 days.</p>
                    </div>
                </div>
            </div>
            {/**------------------description and review section--------- */}
            <div className="mt-20">
            <div className="flex">

                <button
                    onClick={() => setActiveTab("reviews")}
                    className={`border px-5 py-3 text-sm cursor-pointer ${
                        activeTab === "reviews"
                            ? "bg-black text-white"
                            : ""
                    }`}
                >
                    Reviews ({productsData.totalReviews})
                </button>

                <button
                    onClick={loadAISummary}
                    className={`border px-5 py-3 text-sm cursor-pointer ${
                        activeTab === "summary"
                            ? "bg-black text-white"
                            : ""
                    }`}
                >
                    Get AI Summary ✨
                </button>

            </div>
            {
    activeTab === "reviews"
    ?
    (
        <div className="border px-6 py-6">

            <div className="border px-6 py-6">
                    <div className="flex gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className="text-2xl"
                            >
                                {star <= rating ? "⭐" : "☆"}
                            </button>
                        ))}
                    </div>
                    <textarea
                        className="border w-full p-3 rounded"
                        rows={4}
                        placeholder="Write your review..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={submitReview}
                            disabled={loading}
                            className="bg-black text-white px-5 py-2 disabled:bg-gray-400"
                        >
                            {
                                loading
                                    ?
                                    "Submitting..."
                                    :
                                    "Submit"
                            }
                        </button>
                        {
                            productsData.reviews?.some(
                                item => item.userId === user?._id
                            )
                            &&
                            <button
                                onClick={deleteReview}
                                className="bg-red-500 text-white px-5 py-2"
                            >
                                Delete
                            </button>
                        }
                    </div>
                    <hr className="my-6" />
                    <div className="mb-4">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border p-2"
                        >
                            <option>Newest</option>
                            <option>Highest</option>
                            <option>Lowest</option>
                        </select>

                    </div>
                    {
                        [...(productsData.reviews || [])]
                            .sort((a, b) => {
                                if (sortBy === "Highest") return b.rating - a.rating;
                                if (sortBy === "Lowest") return a.rating - b.rating;
                                return new Date(b.createdAt) - new Date(a.createdAt);
                            })
                            .map((item) => (
                                <div
                                    key={item._id}
                                    className="border-b py-4"
                                >
                                    <h3 className="font-semibold">
                                        {
                                            item.userId === user?._id
                                                ?
                                                "You"
                                                :
                                                item.userName
                                        }
                                    </h3>
                                    <p>
                                        {"⭐".repeat(item.rating)}
                                    </p>
                                    <p className="text-gray-600">
                                        {item.review}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {
                                            new Date(item.createdAt).toLocaleDateString()
                                        }
                                    </p>
                                </div>
                            ))
                    }
                </div>

        </div>
    )
    :
    (
        <div className="border px-6 py-6">

        {
            loadingSummary
            ?
            (
                <div className="animate-pulse space-y-4">

                    <div className="h-4 bg-gray-200 rounded w-full"></div>

                    <div className="h-4 bg-gray-200 rounded w-11/12"></div>

                    <div className="h-4 bg-gray-200 rounded w-10/12"></div>

                    <div className="h-4 bg-gray-200 rounded w-9/12"></div>

                    <div className="h-4 bg-gray-200 rounded w-8/12"></div>

                </div>
            )
            :
            (
                <p className="text-gray-600 leading-7">
                    {displayedSummary}
                </p>
            )
        }

        </div>
    )
}
                
            </div>
        </div>
    </>) : <div className="opacity-0"></div>;
}
export default Product;