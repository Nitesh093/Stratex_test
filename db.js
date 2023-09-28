const mongoose=require("mongoose");

const mongodb=async ()=>{
    setTimeout(async()=>{
        await mongoose.connect("mongodb://127.0.0.1/stratex");
        console.log("database  connect");
    },2000)
    
}
module.exports=mongodb(); 