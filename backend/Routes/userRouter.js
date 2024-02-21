const {Router}=require('express');
const jwt=require('jsonwebtoken');
const Users = require('../model/Users');

const userRouter=Router();
const secret_key="shivamannad"
userRouter.post('/register',async (req,res)=>{
    const newUser=new Users(req.body);
    let savedata=await newUser.save();
    savedata=savedata.toObject();
    delete savedata.password;
    jwt.sign({savedata},secret_key,(err,token)=>{
        res.status(200).json({savedata,token:token});
    })
})

userRouter.get('/',async (req,res)=>{
    const data=await Users.find();
    res.status(200).json(data);
})
userRouter.post('/login',async (req,res)=>{
    if(req.body.email && req.body.password){
        let user=await Users.findOne(req.body);
        if(user){
            jwt.sign({user}, secret_key, {expiresIn: '2h'}, (err,token)=>{
                if(err){
                    res.send({message:"Something went wrong ",err})
                }
                res.send({user,token:token})
            })
        }
        else{
            res.send({result:"No User found"})
        }
    }
    else{
        res.send({result:"No Userkk Found"})
    }
})

module.exports=userRouter;