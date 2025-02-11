const express=require("express");
const { conection } = require("./config/db");
const adminrouter = require("./routers/adminrouter");
const dotenv=require("dotenv").config();
const cors = require("cors");
const productrouter = require("./routers/productrouter");
const userrouter = require("./routers/userrouter");
const auth = require("./middleware/auth");
const cartRouter = require("./routers/cartRouter");

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'https://clothing-ecommerce-website-seven.vercel.app'
}));
  

app.get("/", (req, res) => res.send("Express Vercel","This is the cart endpoint"));
//admin
app.use("/admin",adminrouter);
app.use("/product",productrouter);
 
//user
app.use("/user",userrouter);
app.use(auth);
app.use("/cart",cartRouter);


app.listen(process.env.PORT,(err)=>{
    if (err) {
        console.log(err);
    }
    conection();
    console.log("server is started");  
});