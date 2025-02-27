import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Shop() {

    const [lsData, setLsData] = useState(JSON.parse(localStorage.getItem("clothwabsitetoken")) || {});
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');  // Search Term State
    const [sortOption, setSortOption] = useState('');  // Sort Option State
    const [isLoading, setIsLoading] = useState(true);  // Loading State

    const navigate = useNavigate();

    useEffect(() => {
        const config = {
            headers: {
                authorization: `Bearer ${lsData.token}`,
            },
        };

        axios
            .get("https://clothing-ecommerce-website-backend.onrender.com/product", config)
            .then((res) => {
                setProducts(res.data.product || []);
                setIsLoading(false);  // Data loading complete
            })
            .catch((err) => {
                console.error(err);
                if (err.response && err.response.status === 401) {
                    navigate("/");
                }
            });
    }, [lsData.token, navigate]);

    const handleProductClick = (product) => {
        navigate(`/Prodectdetail/${product._id}`);
    };

    const newIconFunction = (date2) => {
        if (!date2) return null;
        const date1 = new Date();
        const productDate = new Date(date2);
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

    // Filter products based on search and sorting
    const filteredProducts = products
        .filter((product) => 
            product.productname.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOption === "lowToHigh") {
                return a.productprice - b.productprice;
            } else if (sortOption === "highToLow") {
                return b.productprice - a.productprice;
            }
            return 0;
        });

    return (
        <>
            <section id="product1" className="section-p1 mt-10">
                <h2>Featured Products</h2>
                <p>Summer Collection New Modern Design</p>

                {/* Search Bar and Sorting Dropdown */}
                <div className="search-filter-bar" style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ flex: 1, padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
                    >
                        <option value="">Sort By</option>
                        <option value="lowToHigh">Price: Low to High</option>
                        <option value="highToLow">Price: High to Low</option>
                    </select>
                </div>

                <div className="pro-container">
                    {isLoading ? (
                        [...Array(6)].map((_, index) => (
                            <div className="skeleton-pro" key={index}>
                                <div className="skeleton-img"></div>
                                <div className="skeleton-text"></div>
                                <div className="skeleton-text short"></div>
                                <div className="skeleton-text"></div>
                            </div>
                        ))
                    ) : (
                        filteredProducts.map((product) => (
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
                                            <i key={index + 5} className="far fa-star"></i>
                                        ))}
                                    </div>
                                    <h4>${product.productprice}</h4>
                                    {newIconFunction(product.createdDate)}
                                </div>
                                <a href="#"><i className="fal fa-shopping-cart cart"></i></a>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </>
    );
}

export default Shop;
