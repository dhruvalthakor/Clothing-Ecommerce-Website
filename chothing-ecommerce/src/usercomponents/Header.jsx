import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const barRef = useRef(null);
    const closeRef = useRef(null);
    const navRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [lsData] = useState(JSON.parse(localStorage.getItem("clothwabsitetoken")) || {});
    const navigate = useNavigate();

    useEffect(() => {
        const bar = barRef.current;
        const close = closeRef.current;
        const nav = navRef.current;

        const handleBarClick = () => nav.classList.add('active');
        const handleCloseClick = () => nav.classList.remove('active');

        bar?.addEventListener('click', handleBarClick);
        close?.addEventListener('click', handleCloseClick);

        return () => {
            bar?.removeEventListener('click', handleBarClick);
            close?.removeEventListener('click', handleCloseClick);
        };
    }, []);

    useEffect(() => {
      

        axios
            .get("https://clothing-ecommerce-website-backend.onrender.com/cart", {
                headers: { authorization: `Bearer ${lsData.token}` },
            })
            .then((res) => setProducts(res.data.carts || []))
            .catch((err) => {
                console.error(err);
                if (err.response?.status === 401) navigate("/");
            });

            axios
            .get("https://clothing-ecommerce-website-backend.onrender.com/", {
                headers: { authorization: `Bearer ${lsData.token}` },
            })
            .then((res) => console.log(res,"header")
            )
            .catch((err) => {
                console.error(err);
                if (err.response?.status === 401) navigate("/");
            });

    }, [lsData.token, navigate]);

function logout() {
    localStorage.clear("clothwabsitetoken")
    navigate("/singin")
}

    return (
        <section id="header">
            <Link to="/"><img src="https://i.postimg.cc/x8ncvFjr/logo.png" alt="Logo" /></Link>
            <div>
                <ul id="navbar" ref={navRef}>
                    <li><Link to="/" className="active">Home</Link></li>
                    <li><Link to="/shop">Shop</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li>
                        <Link to="/ShoppingCart" id="lg-bag">
                            <i className="fal fa-shopping-bag"></i>
                            <span className="quantity">{products.length}</span>
                        </Link>
                    </li>
                    <li>
                        <a href="#" id="close" ref={closeRef}><i className="far fa-times"></i></a>
                    </li>
                    <li>
                    {lsData.token ? (
                            <button className="btn " onClick={logout}>Logout</button>
                        ) : (
                            <Link className="btn " to="/singin">Login</Link>
                        )}
                    </li>
                </ul>
            </div>
            <div id="mobile">
                <Link to="/ShoppingCart">
                    <i className="fal fa-shopping-bag"></i>
                    <span className="quantity">{products.length}</span>
                </Link>
                <i id="bar" className="fas fa-outdent" ref={barRef}></i>
                       {lsData.token ? (
                            <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                        ) : (
                            <Link className="btn btn-outline-primary" to="/signin">Login</Link>
                        )}
            </div>
         
        </section>
    );
}

export default Header;
