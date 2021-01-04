const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema
const Schema = mongoose.Schema

const productCartSchema = new Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
    name:{
        type:String
    },
    count:{
        type:Number
    },
    price:{
        type:Number
    }
})
const productCart = mongoose.model("productCart",productCartSchema)
const orderSchema = new Schema({
    products:[productCartSchema],
    transaction_id:{
        type:Number
    },
    amount:{
        type:Number
    },
    address:{
        type:String,
        maxlength:55
    },
    updated:{
        type:Date
    },
    user:{
        type:ObjectId,
        ref:"User"
    }
},{timestamps:true})
const Order = mongoose.model("Order",orderSchema)

module.exports = {productCart,Order}