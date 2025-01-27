const mongoose=require("mongoose");

module.exports.conection=async()=>{
    await mongoose.connect("mongodb://127.0.0.1/clothing-ecommerce-website");
    console.log("database connected");
}