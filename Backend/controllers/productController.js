// function for add product
import {v2 as cloudinary} from "cloudinary";
import productModel from "../models/productModel.js";
import redis from "../config/redis.js";
import userModel from "../models/userModel.js";
import generateReviewSummary from "../services/reviewSummaryService.js";
import logger from "../utils/logger.js";

const addProduct = async(req,res)=>{
    try{
        const {name,description,price,category,subcategory , sizes,bestSeller,stock,color,tags} = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1,image2,image3,image4].filter((item)=>item!=null);
        let imagesUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:"image"});
                return result.secure_url;
            })
        )
        const productsData = {
            name,
            description,
            category,
            price:Number(price),
            subcategory,
            bestSeller: bestSeller==="true"?true:false,
            sizes:JSON.parse(sizes),
            image:imagesUrl,
            stock: Number(stock),
            color,
            tags: tags? tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0): [],
            date:Date.now()
        }
        const product = new productModel(productsData);
        await product.save();

        console.log(productsData);
        res.json({success:true,message:"Product Added"});
    }catch(error){
        logger.error(error);
        res.json({sucess:false,message:error.message});
    }
}
 
// function for list all product
const listProduct = async(req,res)=>{
    try {
        const products = await productModel.find({});
        res.json({success:true,products});
    } catch (error) {
        logger.error(error);
        res.json({success:false,message:error.message});
    }
}

// function for remove product
const removeProduct = async(req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Successfully Removed The Product"});
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

// function for info of product
const singleProduct = async(req,res)=>{
    try{
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success:true,product});
    }catch(error){
        res.json({success:false,message:error.message});
    }
}

const addOrUpdateReview = async (req,res)=>{

    try{

        const userId = req.profileUserId;

        const {productId,rating,review} = req.body;

        if(rating<1 || rating>5){
            return res.json({
                success:false,
                message:"Rating must be between 1 and 5"
            });
        }

        const product = await productModel.findById(productId);

        if(!product){
            return res.json({
                success:false,
                message:"Product not found"
            });
        }

        const user = await userModel.findById(userId);

        if(!user){
            return res.json({
                success:false,
                message:"User not found"
            });
        }

        // Check if user has already reviewed

        const existingReview = product.reviews.find(
            review=>review.userId.toString()===userId
        );

        // Check verified buyer

        if(existingReview){

            existingReview.rating = rating;
            existingReview.review = review;
            existingReview.updatedAt = Date.now();

        }
        else{

            product.reviews.push({

                userId,

                userName:user.name,

                rating,

                review,

            });

        }

        product.totalReviews = product.reviews.length;

        const totalRating = product.reviews.reduce(

            (sum,item)=>sum+item.rating,

            0

        );

        if(product.totalReviews===0){
            product.averageRating=0;
        }
        else{
            product.averageRating=totalRating/product.totalReviews;
        }

        await product.save();
        await redis.del(`review_summary:${product._id}`);
        return res.json({

            success:true,

            message:existingReview
            ?
            "Review Updated"
            :
            "Review Added",

            product

        });

    }
    catch(error){

        logger.error(error);

        return res.json({

            success:false,

            message:error.message

        });

    }

}

const deleteReview = async (req,res)=>{

    try{

        const userId = req.profileUserId;

        const {productId} = req.body;

        const product = await productModel.findById(productId);

        if(!product){
            return res.json({
                success:false,
                message:"Product not found"
            });
        }

        const reviewIndex = product.reviews.findIndex(
            review => review.userId.toString()===userId
        );

        if(reviewIndex===-1){
            return res.json({
                success:false,
                message:"Review not found"
            });
        }

        product.reviews.splice(reviewIndex,1);

        product.totalReviews = product.reviews.length;

        if(product.totalReviews===0){

            product.averageRating=0;

        }
        else{

            const totalRating = product.reviews.reduce(
                (sum,item)=>sum+item.rating,
                0
            );

            product.averageRating=totalRating/product.totalReviews;

        }

        await product.save();
        await redis.del(`review_summary:${product._id}`);
        return res.json({
            success:true,
            message:"Review deleted",
            product
        });

    }
    catch(error){

        logger.error(error);

        return res.json({
            success:false,
            message:error.message
        });

    }

}

const getReviewSummary = async (req, res) => {
    try {

        const { productId } = req.body;

        const product = await productModel.findById(productId);

        if (!product) {
            return res.json({
                success: false,
                message: "Product not found"
            });
        }

        if (product.reviews.length === 0) {
            return res.json({
                success: false,
                message: "No reviews available to summarize."
            });
        }

        const summary = await generateReviewSummary(product);

        return res.json({
            success: true,
            summary
        });

    } catch (error) {

        logger.error(error);

        return res.json({
            success: false,
            message: error.message
        });

    }
};
export {singleProduct,removeProduct,listProduct,addProduct, addOrUpdateReview, deleteReview, getReviewSummary};