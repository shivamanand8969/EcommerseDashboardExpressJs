const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/EcommerseDashBoard')
.then(()=>{
    console.log("database connected")
})
