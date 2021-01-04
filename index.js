const mongoose = require('mongoose')
require('dotenv').config()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRoutes = require('./routers/auth.js')
const express = require("express")
const app = express()
const port = 3000


//connect with the database
mongoose.connect(process.env.DATABASE, 
{useNewUrlParser: true,
useUnifiedTopology:true,
useCreateIndex:true}).then(()=>{
    console.log("DB CONNECTED")
})

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())


app.use("/api",authRoutes)

app.listen(port,()=>{
    console.log(`server is working on the port ${port}`)
})