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
        .get("/api/product", config)
            .then((res) => {
                console.log(res);
                
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



    
    const newiconefuthion = (date2) => {
        if (!date2) return null; // Handle missing date case
    
        const date1 = new Date();
        const productDate = new Date(date2); // Convert API date string to Date object
    
        // Calculate difference in days
        const daysDiff = Math.floor((date1 - productDate) / (1000 * 60 * 60 * 24));
    
        if (daysDiff <= 3) {
            return (
                <div className="new-icone">
                    <img
                        className="new-icone-img"
                        src="https://png.pngtree.com/png-vector/20221030/ourmid/pngtree-sign-of-newbanner-vector-concept-illustration-business-yellow-collection-vector-png-image_39897080.png"
                        alt="New Product"
                    />
                </div>
            );
        }
        return null;
    };
    


    return (
        <>
            <section id="product1" class="section-p1 mt-10">
                <h2>Featured Products</h2>
                <p>Summer Collection New Modern Design</p>
                <div class="pro-container">

                {
    products.map((product) => (
        <div className="pro relative" key={product._id} onClick={() => handleProductClick(product)}>
            <img src={product.productimage} alt={product.productname} />
            <div className="des">
                <span>{product.productbrand}</span>
                <h5>{product.productname}</h5>
                <div className="star">
                    {Array.from({ length: Math.round(product.productrating) }).map((_, index) => (
                        <i key={index} className="fas fa-star"></i>
                    ))}
                    {Array.from({ length: 5 - Math.round(product.productrating) }).map((_, index) => (
                        <i key={index + 5} className="far fa-star"></i> // Outline star for remaining
                    ))}
                </div>
                <h4>${product.productprice}</h4>

          {newiconefuthion(product.createdDate)} 
            </div>
            <a href="#"><i className="fal fa-shopping-cart cart"></i></a>
        </div>
    ))
}

                </div>
            </section>
        </>
    )
}

export default Shop
