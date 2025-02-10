import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
    const [lsData, setLsData] = useState(
        JSON.parse(localStorage.getItem("clothwabsitetoken")) || {}
    );
    const [products, setProducts] = useState([]);
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
            .get("https://clothing-ecommerce-website-onjj.vercel.app/cart", config)
            .then((res) => {
                setProducts(res.data.carts || []);
            })
            .catch((err) => {
                console.error(err);
                if (err.response && err.response.status === 401) {
                    navigate("/");
                }
            });
    }, [lsData.token, navigate]);

    const totalAmount = products.reduce((acc, data) => acc + data.product.productprice * data.quantity, 0);


    const deletehender=(id)=>{
        try {
            if (!lsData.token) {
                navigate("/singin");
                return;
            }
    
            const config = {
                headers: {
                    authorization: `Bearer ${lsData.token}`,
                },
            };
    console.log(id);
    
            axios
                .delete(`https://clothing-ecommerce-website-onjj.vercel.app/cart/deletecart/${id}`, config)
                .then((res) => {
              
                    

                })
                .catch((err) => {
                    console.error(err);
                    if (err.response && err.response.status === 401) {
                        navigate("/");
                    }
                });
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen p-8 mt-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Shopping Cart Items */}
                <div className="lg:col-span-2">
                    <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
                    <div className="space-y-6">
                        {products.map((data, index) => (
                            <div key={index} className="flex items-start justify-between border-b pb-4">
                                <div className="flex gap-4">
                                    <img
                                        src={data?.product?.productimage || "https://via.placeholder.com/100"}
                                        alt={data?.product?.productname || "Product"}
                                        className="w-24 h-24 object-cover rounded-md"
                                    />
                                    <div>
                                        <p className="text-gray-500">{data?.product?.productbrand || "Unknown Brand"}</p>
                                        <h2 className="text-lg font-medium">{data?.product?.productname || "Product Name"}</h2>
                                        <h2 className="text-lg font-medium">${data?.product?.productprice || 0}</h2>
                                        <p className="mt-1 text-sm text-green-600">Size: {data?.size || "N/A"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 cart-datile">
                                    <input 
                                        className="border border-gray-300 rounded-md p-1" 
                                        type="number" 
                                        value={data?.quantity || 1} 
                                        readOnly
                                    />
                                    <p className="text-lg font-medium">
                                        ${((data?.product?.productprice || 0) * (data?.quantity || 1)).toFixed(2)}
                                    </p>
                                    <button onClick={()=>deletehender(data._id)} className="text-gray-500 hover:text-red-600">✕</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <p>Subtotal</p>
                            <p>${totalAmount}</p>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <p>Shipping estimate</p>
                            <p>$5.00</p>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <p>Tax estimate</p>
                            <p>$3.32</p>
                        </div>
                        <div className="flex justify-between text-lg font-medium">
                            <p>Order total</p>
                            <p>${totalAmount + 5.00 + 3.32}</p>
                        </div>
                    </div>
                    <button className="mt-6 w-full bg-[#088178] text-white py-2 rounded-md hover:bg-[#066a5d]">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
