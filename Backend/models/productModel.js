import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    userName:{type:String,required:true},
    rating:{type:Number,required:true,min:1,max:5},
    review:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
});

const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:Array,required:true},
    category:{type:String,required:true},
    subcategory:{type:String,required:true},
    sizes:{type:Array,required:true},
    bestSeller:{type:Boolean},
    date:{type:Number,required:true},
    averageRating:{type:Number,default:0},
    totalReviews:{type:Number,default:0},
    reviews:{type:[reviewSchema],default:[]},
    tags:{type:[String]},
    stock:{type:Number},
    color:{type:String}
});

const productModel = mongoose.models.product|| mongoose.model("product",productSchema);
export default productModel;