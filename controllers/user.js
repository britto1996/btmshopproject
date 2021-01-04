const User = require("../models/user")


exports.getUserId = (req,res,next,_id)=>{
    User.findById(_id)
    .exec((err,user)=>{
        if(err || !user){
            res.json({
                message:"not a valid user"
            })
        }
        if(user){
            req.profile = user
        }
    })
    next()
}

exports.getUser = (req,res)=>{
    res.json(req.profile)
}