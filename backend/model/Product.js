const mongoose =require('mongoose');
const porductschema=new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    company:String
})

module.exports=mongoose.model('Product',porductschema);