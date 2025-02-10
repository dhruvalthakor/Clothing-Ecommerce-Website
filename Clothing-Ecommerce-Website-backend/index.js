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
// const cors = require('cors');
app.use(cors({ origin: 'https://clothing-ecommerce-website-mu76.vercel.app' }));
// app.use(cors());
// app.use(
//     cors({
//       origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//           callback(null, true);
//         } else {
//           callback(new Error("CORS policy does not allow this origin"));
//         }
//       },
//     })
//   );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Express Vercel"));
//admin
app.use("/api/admin",adminrouter);
app.use("/api/product",productrouter);
 
//user
app.use("/api/user",userrouter);
app.use(auth);
app.use("/api/cart",cartRouter);


app.listen(process.env.PORT,(err)=>{
    if (err) {
        console.log(err);
    }
    conection();
    console.log("server is started");  
});