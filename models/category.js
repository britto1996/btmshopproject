const mongooose = require("mongoose")
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name:{
        type:String,
        trim:true,
        maxlength:250,
        unique:true
    }
},{timestamps:true})

module.exports = mongooose.model("Category",categorySchema)