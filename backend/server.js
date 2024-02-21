require('./DatabaseConnect/connect')
const express=require('express');
const userRouter = require('./Routes/userRouter');
const bodyParser=require('body-parser');
const jwt=require('jsonwebtoken')
const cors=require('cors');
const prdrouter = require('./Routes/productRouter');
const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use('/signup',userRouter);
app.use('/product',prdrouter);

app.listen(5000,()=>{
    console.log("Server is running");
})