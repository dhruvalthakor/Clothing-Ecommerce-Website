import React from 'react'
import { Link } from 'react-router-dom'

function Herosection() {
  return (
    <>
     <section id="hero">
  <h4>Trade-in-fair</h4>
  <h2 className="">Super value deals</h2>
  <h1>On all Products</h1>
  <p>Save more with coupons and up to 70% off!</p>
  <button><Link to={"/shop"}>Shop Now</Link></button>
  
</section> 
    </>
  )
}

export default Herosection
