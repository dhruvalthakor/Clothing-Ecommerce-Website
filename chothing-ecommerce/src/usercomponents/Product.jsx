import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Shop() {
    const [lsData, setLsData] = useState(JSON.parse(localStorage.getItem("clothwabsitetoken")) || {});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        

        axios
            .get("https://clothing-ecommerce-website-backend.onrender.com/product", {
                headers: { authorization: `Bearer ${lsData.token}` },
            })
            .then((res) => setProducts(res.data.product || []))
            .catch((err) => {
                console.error(err);
                if (err.response?.status === 401) navigate("/");
            })
            .finally(() => setLoading(false)); // Set loading to false after fetching
    }, [lsData.token, navigate]);

    const handleProductClick = (product) => {
        navigate(`/Productdetail/${product._id}`);
    };

    const renderNewIcon = (createdDate) => {
        if (!createdDate) return null;
        const daysDiff = Math.floor((new Date() - new Date(createdDate)) / (1000 * 60 * 60 * 24));
        return daysDiff <= 3 ? (
            <div className="new-icon">
                <img
                    className="new-icon-img"
                    src="https://png.pngtree.com/png-vector/20221030/ourmid/pngtree-sign-of-newbanner-vector-concept-illustration-business-yellow-collection-vector-png-image_39897080.png"
                    alt="New Product"
                />
            </div>
        ) : null;
    };

    const renderSkeleton = () => (
        Array.from({ length: 6 }).map((_, index) => (
            <div className="pro skeleton" key={index}>
                <div className="skeleton-img"></div>
                <div className="des">
                    <div className="skeleton-text short"></div>
                    <div className="skeleton-text"></div>
                    <div className="skeleton-stars"></div>
                    <div className="skeleton-text price"></div>
                </div>
                <div className="skeleton-btn"></div>
            </div>
        ))
    );

    return (
        <section id="product1" className="section-p1 mt-10">
            <h2>Featured Products</h2>
            <p>Summer Collection New Modern Design</p>
            <div className="pro-container">
                {loading
                    ? renderSkeleton()
                    : products.map((product) => (
                        <div className="pro relative" key={product._id} onClick={() => handleProductClick(product)}>
                            <img src={product.productimage} alt={product.productname} />
                            <div className="des">
                                <span>{product.productbrand}</span>
                                <h5>{product.productname}</h5>
                                <div className="star">
                                    {Array.from({ length: Math.round(product.productrating) }).map((_, i) => (
                                        <i key={i} className="fas fa-star"></i>
                                    ))}
                                    {Array.from({ length: 5 - Math.round(product.productrating) }).map((_, i) => (
                                        <i key={i + 5} className="far fa-star"></i>
                                    ))}
                                </div>
                                <h4>${product.productprice}</h4>
                                {renderNewIcon(product.createdDate)}
                            </div>
                            <button className="cart-btn">
                                <i className="fal fa-shopping-cart cart"></i>
                            </button>
                        </div>
                    ))}
            </div>
        </section>
    );
}

export default Shop;
