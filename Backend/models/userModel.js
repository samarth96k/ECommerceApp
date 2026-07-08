import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String},
    cartData:{type:Object,default:{}},
    googleId:{type:String},
    provider:{type:String},    
    age: {type: Number,default: null},
    phone: {type: String,default: ""},
    gender: {type: String,default: ""},
    addresses: [
        {
            fullName: String,
            phone: String,
            houseNo: String,
            street: String,
            landmark: String,
            city: String,
            state: String,
            country: String,
            pincode: String,
            addressType: {type: String,enum: ["Home","Work","Other"],default: "Home"},
            isDefault:{type:Boolean,default:false}
        }
    ],
},{minimize:false,timestamps:true});

const userModel = mongoose.models.user || mongoose.model("user",userSchema);

export default userModel;