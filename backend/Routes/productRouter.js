const {Router}=require('express');
const prdrouter=Router();
const Product = require('../model/Product');
const jwt=require('jsonwebtoken');
const secret_key="shivamannad"

prdrouter.post('/add-product',varifyToken, async (req,res)=>{
    const data=req.body;
    const newproduct=new Product(data);
    const savedData=await newproduct.save();
    res.send(savedData);
})

prdrouter.get('/get-product',varifyToken, async (req,res)=>{
      const data=await Product.find();
      res.send(data);
})
prdrouter.delete('/delete-product/:id',varifyToken,async (req,res)=>{
    const id =req.params.id;
    const deleteData=await Product.findByIdAndDelete(id);
    res.status(200).json({deleteData, message:"Data Delete SuccessFully"})
})
prdrouter.get('/get-product/:id',varifyToken,async (req,res)=>{
    const id=req.params.id;   
    try {
        const data=await Product.findById(id);    
        res.send(data)
    } catch (error) {
        console.log("erreor",error)
        res.send(error)
    }
})

prdrouter.put('/get-product/:id',varifyToken ,async (req,res)=>{
   const id=req.params.id;
   const data=req.body;
   const updateData=await Product.findByIdAndUpdate(id,data);
   res.send(updateData);
})

prdrouter.get('/search/:key',varifyToken ,async (req,res)=>{
    let key=req.params.key;
    let result=await Product.find({
        '$or':[
            {name:{$regex:key}},
            {category:{$regex:key}},
            {company:{$regex:key}}
        ]
    }) 
    res.send(result)   
})
 function varifyToken(req,res,next){
    let token=req.headers.token;
    if(!token){
        res.send("Please passs the token in header")
    }
    else{
        jwt.verify(token,secret_key,(err,tokendata)=>{
            if(err){
                console.log("Err ",err)
                res.send("Error: ",err);
            }
            else{
                
                next();
            }
        })
    }

    
 }

module.exports=prdrouter;