import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Prodectdetail() {
  const [lsData] = useState(JSON.parse(localStorage.getItem('clothwabsitetoken')) || {});
  const [product, setProduct] = useState(null); 
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [form, setForm] = useState({
    size: "",
    quantity: "1"
  });

  useEffect(() => {
    if (!lsData.token) {
      navigate('/signin'); 
      return;
    }

    const config = {
      headers: {
        authorization: `Bearer ${lsData.token}`,
      },
    };

    axios
      .get(`http://localhost:8060/product`, config)
      .then((res) => {
        const allProducts = res.data.product || [];
        const foundProduct = allProducts.find((prod) => prod._id === id); // Match by ID
        setProduct(foundProduct);
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.status === 401) {
          navigate('/');
        }
      });
  }, [id, lsData.token, navigate]);

  const handleData = (e) => {
    e.preventDefault();
    if (!lsData.token) {
      navigate('/signin'); 
      return;
    }

    const config = {
      headers: {
        authorization: `Bearer ${lsData.token}`,
      },
    };
  
    axios.post(`http://localhost:8060/cart/addcart/${id}`,form,config)
      .then((res) => {
        console.log("Response:", res.data);
        
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <section id="prodetails" className="section-p1">
      
        <div className="single-pro-image">
          <img src={product.productimage} width="100%" id="MainImg" alt={product.productname} />
          <div className="small-img-group mt-2">
            <div className="small-img-col">
              <img src="https://i.postimg.cc/kg9YYbTn/f1.jpg" width="100%" className="small-img" alt="Extra Image 1" />
            </div>
            <div className="small-img-col">
              <img src="https://i.postimg.cc/2yhT2kvb/f2.jpg" width="100%" className="small-img" alt="Extra Image 2" />
            </div>
            <div className="small-img-col">
              <img src="https://i.postimg.cc/VL9DtNm2/f3.jpg" width="100%" className="small-img" alt="Extra Image 3" />
            </div>
            <div className="small-img-col">
              <img src="https://i.postimg.cc/vZ3hPS1z/f4.jpg" width="100%" className="small-img" alt="Extra Image 4" />
            </div>
            <div className="small-img-col">
              <img src="https://i.postimg.cc/q7FLrhx6/f5.jpg" width="100%" className="small-img" alt="Extra Image 5" />
            </div>
          </div>
        </div>

        <div className="single-pro-details">
          <h6>Home/T-shirt</h6>
          <h6>{product.productbrand}</h6>
          <h4>{product.productname}</h4>
          <div className="star">
                    {Array.from({ length: Math.round(product.productrating) }).map((_, index) => (
                        <i key={index} className="fas fa-star"></i>
                    ))}
                    {Array.from({ length: 5 - Math.round(product.productrating) }).map((_, index) => (
                        <i key={index + 5} className="far fa-star"></i> // Outline star for remaining
                    ))}
                </div>
          <h2>${product.productprice}</h2>
          <select value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })}>
            <option value="">Select-size</option>
            <option value="S">S (36)</option>
            <option value="M">M (38)</option>
            <option value="L">L (40)</option>
            <option value="XL">XL (42)</option>
            <option value="XXL">XXL (44)</option>
          </select>
          <input type="number" value={form.quantity}  onChange={(e) => setForm({ ...form, quantity: e.target.value })}/>
          <button className="btn normal" onClick={handleData}>Add to Cart</button>
          <h4>Product Details</h4>
          <span>
            The Gildan Ultra Cotton T-shirt is made from a substantial 6.0 oz. per sq. yd. fabric constructed from
            100% cotton. This classic, preshrunk jersey knit provides unmatched comfort with each wear.
          </span>
        </div>
    
    </section>
  );
}

export default Prodectdetail;
