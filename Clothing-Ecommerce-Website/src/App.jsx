import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import Header from "./usercomponents/Header";
import Herosection from "./usercomponents/Herosection";
import Feature from "./usercomponents/Feature";
import Product from "./usercomponents/Product";

import Banner from "./usercomponents/Banner";
import Smbanner from "./usercomponents/Smbanner";
import Newsletter from "./usercomponents/Newsletter";
import Footer from "./usercomponents/Footer";
import Signin from "./usercomponents/signin";
import SignUp from "./usercomponents/signup";
import Prodectdetail from "./usercomponents/Prodectdetail";
import Shop from "./usercomponents/Shop";



function Home() {
  return <><Header/>,<Herosection/>,<Feature/>,<Product/>,<Banner/>,<Smbanner/><Newsletter/><Footer/>,</>;
}

function Prodectdetailpage() {
  return <><Header/>,<Prodectdetail/>,<Product/>,<Newsletter/><Footer/>,</>;
}

function ShopPage() {
  return <><Header/>,<Shop/>,<Newsletter/><Footer/>,</>;
}

function App() {
  
  <Home/>
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Prodectdetail/:id" element={<Prodectdetailpage/>} />
      <Route path="/shop" element={<ShopPage/>} />
      <Route path="/singin" element={<Signin/>} />
      <Route path="/singup" element={<SignUp/>} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
