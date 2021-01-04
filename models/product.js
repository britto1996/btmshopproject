const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema
const Schema = mongoose.Schema

const productSchema = new Schema({
    name:{
        type:String,
        trim:true,
        maxlength:32
    },
    description:{
        type:String,
        trim:true,
        maxlength:1000
    },
    price:{
        type:Number
    },
    category:{
        type:ObjectId,
        ref:"Category",
    },
    stock:{
        type:Number
    },
    sold:{
        type:Number,
        default:0
    },
    photo:{
        type:Buffer,
        contentType:String
    }
},{timestamps:true})

module.exports = mongoose.model("Product",productSchema)