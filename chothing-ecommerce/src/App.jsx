import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Header from './usercomponents/Header';
import Herosection from './usercomponents/Herosection';
import Feature from './usercomponents/Feature';
import Product from './usercomponents/Product';
import Banner from './usercomponents/Banner';
import Smbanner from './usercomponents/Smbanner';
import Newsletter from './usercomponents/Newsletter';
import Footer from './usercomponents/Footer';
import Prodectdetail from './usercomponents/Prodectdetail';
import Shop from './usercomponents/Shop';
import ShoppingCart from './usercomponents/ShoppingCart';
import Signin from './usercomponents/Signin';
import SignUp from './usercomponents/SignUp';


function Home() {
  return <><Header/>,<Herosection/>,<Feature/>,<Product/>,<Banner/>,<Smbanner/><Newsletter/><Footer/>,</>;
}

function Prodectdetailpage() {
  return <><Header/>,<Prodectdetail/>,<Product/>,<Newsletter/><Footer/>,</>;
}

function ShopPage() {
  return <><Header/>,<Shop/>,<Newsletter/><Footer/>,</>;
}
function ShoppingCartpage() {
  return <><Header/>,<ShoppingCart/>,<Newsletter/><Footer/>,</>;
}

function App() {
  return (
  
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Prodectdetail/:id" element={<Prodectdetailpage/>} />
      <Route path="/shop" element={<ShopPage/>} />
      <Route path="/ShoppingCart" element={<ShoppingCartpage/>} />
      <Route path="/singin" element={<Signin/>} />
      <Route path="/singup" element={<SignUp/>} />
    </Routes>
  );
}

export default App
