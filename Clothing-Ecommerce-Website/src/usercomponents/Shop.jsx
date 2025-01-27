import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Shop() {

  
    const [lsData, setLsData] = useState(JSON.parse(localStorage.getItem("clothwabsitetoken")) || {});
    const [products, setproducts] = useState([]);
   
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
            <section id="product1" class="section-p1 mt-10">
                <h2>Featured Products</h2>
                <p>Summer Collection New Modern Design</p>
                <div class="pro-container">

                    {
                        products.map((product) => (
                            <div class="pro" key={product._id} onClick={() => handleProductClick(product)}>
                                <img src={product.productimage} alt="" />
                                <div class="des">
                                    <span>{product.productbrand}</span>
                                    <h5>{product.productname}</h5>
                                    <div class="star">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <h4>${product.productprice}</h4>
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

export default Shop
