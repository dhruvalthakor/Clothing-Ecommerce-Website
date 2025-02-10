import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Header() {
    const barRef = useRef(null);
    const closeRef = useRef(null);
    const navRef = useRef(null);
    const [products, setProducts] = useState([]);
 const [lsData, setLsData] = useState(
        JSON.parse(localStorage.getItem("clothwabsitetoken")) || {}
    );
    const navigate = useNavigate();


    useEffect(() => {
        const bar = barRef.current;
        const close = closeRef.current;
        const nav = navRef.current;

        const handleBarClick = () => {
            nav.classList.add('active');
        };

        const handleCloseClick = () => {
            nav.classList.remove('active');
        };

        if (bar) {
            bar.addEventListener('click', handleBarClick);
        }

        if (close) {
            close.addEventListener('click', handleCloseClick);
        }

        // Cleanup event listeners when the component unmounts
        return () => {
            if (bar) {
                bar.removeEventListener('click', handleBarClick);
            }
            if (close) {
                close.removeEventListener('click', handleCloseClick);
            }
        };
    }, []);

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
            .get("https://clothing-ecommerce-website-mu76.vercel.app/cart", config)
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

    return (
        <>
            <section id="header">
                <a href="#"><img src="https://i.postimg.cc/x8ncvFjr/logo.png" alt="Logo" /></a>
                <div>
                    <ul id="navbar" ref={navRef}>
                        <li><Link to={"/"} className="active">Home</Link></li>
                        <li><Link  to={"/shop"}>Shop</Link></li>
                        <li><Link href="blog.html">Blog</Link></li>
                        <li><Link href="about.html">About</Link></li>
                        <li><Link href="contact.html">Contact</Link></li>
                        <li>
                            <Link to={"/ShoppingCart"} id="lg-bag"><i className="fal fa-shopping-bag"></i></Link>
                            <span className="quantity">{products.length}</span>
                        </li>
                        <li>
                            <a href="#" id="close" ref={closeRef}><i className="far fa-times"></i></a>
                        </li>
                    </ul>
                </div>
                <div id="mobile">
                    <Link href="cart.html"><i className="fal fa-shopping-bag"></i>
                        <span className="quantity">0</span>
                    </Link>
                    <i id="bar" className="fas fa-outdent" ref={barRef}></i>
                </div>
            </section>
        </>
    );
}

export default Header;
