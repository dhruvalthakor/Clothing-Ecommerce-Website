import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Product() {


  const [productData, setproductData] = useState();
  const [lsData, setLsData] = useState(JSON.parse(localStorage.getItem("clothwabsitetoken")) || {});
  const [products, setproducts] = useState([]);
  const [editproduct, setEditproduct] = useState(null);
  const [addproduct, setaddproduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      if (!lsData.token) {
          navigate("/singin");
          return;
      }

      const config = {
          headers: {
              authorization: `Bearer ${lsData.token}`,
          },
      };

      axios
          .get("http://localhost:8060/product", config)
          .then((res) => {
              setproducts(res.data.product || []);
          })
          .catch((err) => {
              console.error(err);
              if (err.response && err.response.status === 401) {
                  navigate("/");
              }
          });
  }, [lsData.token, navigate]);

  const logout = () => {
      localStorage.clear("clothwabsitetoken");
      navigate("/login");
  };


  const handleProductClick = (product) => {
    navigate(`/Prodectdetail/${product._id}`);
  };
  
  return (
    <>
      <section id="product1" class="section-p1">
  <h2>Featured Products</h2>
  <p>Summer Collection New Modern Design</p>
  <div class="pro-container">
  
    {
      products.slice(0, 8).map((data)=>(
        <div class="pro" key={data._id} onClick={() => handleProductClick(data)}>
        <img src={data.productimage} alt=""/>
        <div class="des">
          <span>{data.productbrand}</span>
          <h5>{data.productname}</h5>
          <div class="star">
            <i class="fas fa-star"></i>
             <i class="fas fa-star"></i>
             <i class="fas fa-star"></i>
             <i class="fas fa-star"></i>
             <i class="fas fa-star"></i>
          </div>
          <h4>${data.productprice}</h4>
        </div>
        <a href=""><i class="fal fa-shopping-cart cart"></i></a>
      </div>
      ))
    }
    
  </div>
</section>
    </>
  )
}

export default Product
