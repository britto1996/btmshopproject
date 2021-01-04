const express = require("express")
const app = express()
const router = express.Router()
const { check,validationResult } = require('express-validator')
const {signUp,signIn,islogIn,signOut} = require("../controllers/auth")

router.post('/signup',[
    check('firstName')
    .isLength({min:3})
    .withMessage('first name must be 3 characters long'),

    check('lastName')
    .isLength({min:3})
    .withMessage('last name must be 3 characters long'),

    check('email')
    .isEmail()
    .withMessage('Not a valid email'),

    check('password')
    .isLength({min:6})
    .withMessage('password having atleast 6 ')
]
,signUp),

router.post('/signin',[
    check('email')
    .isEmail()
    .withMessage('Email is required'),

    check('password')
    .isLength({min:6})
    .withMessage('password muust contain atleast 6 characters')
],signIn)


router.get('/signout',signOut)



module.exports = router
