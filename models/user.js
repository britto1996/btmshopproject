const { v4: uuidv4 } = require('uuid')
const crypto = require('crypto')
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName:{
        type:String,
        trim:true,
        maxlength:32
    },
    lastName:{
        type:String,
        trim:true,
        maxlength:32
    },
    email:{
        type:String,
        lowercase:true,
        trim:true
    },
    userInfo:{
        type:String,
        trim:true
    },
    encry_password:{
        type:String,
        require:true
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    }

    
},{timestamps:true})
//random password setting and it make secure
userSchema.virtual("password").set(function(password){
    this._password = password
    this.salt = uuidv4()
    this.encry_password = this.securePassword(password)
}).get(function(){
    return this._password
})

//validation field using in password
userSchema.methods = {
    authenticate:function(plainpassword){
        return this.securePassword(plainpassword)===this.encry_password
    },
    securePassword:function(plainpassword){
        if(!plainpassword){
            return ""
        }else{
            try{
                return crypto.createHmac('sha256',this.salt)
                    .update(plainpassword)
                    .digest('hex')
            }catch (err){
                return ""
            }
        }
    }
}


module.exports = mongoose.model("User",userSchema)