const User = require("../models/user")
const { check,validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const user = require("../models/user")



exports.signUp = (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json(errors.array())
    }else{
        res.send("successfully validated")
    }

    const user = new User(req.body)
    user.save().then(item=>{
         res.json({
         message:user
    })
    }).catch(err=>{
        res.json({
            message:"unable to save database"
        })
    })
   
   
    
}

exports.signIn = (req,res)=>{
    const errors = validationResult(req)
    const {email,password} = req.body
    if(!errors.isEmpty()){
        res.json({
            message:errors.array()
        })
    }

    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.json({
                message:"This email already exist"
            })
        }

         if(!user.authenticate(password)){
            return res.json({
                message:"Email and password doesn't match"

            })
        }

         //create token

        const token = jwt.sign({_id:user._id},process.env.SECRET)

        //put token in cookie

        res.cookie('token',token,{expire:3600+Date.now()})

        const {_id,firstName,lastName,email,role} = user
        return res.json({

            token,user:{_id,firstName,lastName,email,role}

        })
    


    })
        
       
       

        

        

}


exports.signOut = (req,res)=>{
    res.clearCookie('token')
    res.json({
        message:"user logged out successfully"
    })
}

exports.islogIn = expressJwt({
    secret:process.env.SECRET,
    algorithms: ['sha1', 'RS256', 'HS256'],
    userProperty:"auth"
})

exports.isAuthorisation = (req,res,next)=>{
    let check = req.profile && req.auth && req.profile._id === req.auth._id
    if(!check){
        res.json({
            err:"autherisation failed"
        })
    }
    next()
}

exports.isAdmin = (req,res,next)=>{
    if(req.profile.role===0){
       return res.json({
            err:"Access denied"
        })
    }
    next()
}
