import React, { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header() {
    const barRef = useRef(null);
    const closeRef = useRef(null);
    const navRef = useRef(null);

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
                            <a href="cart.html" id="lg-bag"><i className="fal fa-shopping-bag"></i></a>
                            <span className="quantity">0</span>
                        </li>
                        <li>
                            <a href="#" id="close" ref={closeRef}><i className="far fa-times"></i></a>
                        </li>
                    </ul>
                </div>
                <div id="mobile">
                    <a href="cart.html"><i className="fal fa-shopping-bag"></i>
                        <span className="quantity">0</span>
                    </a>
                    <i id="bar" className="fas fa-outdent" ref={barRef}></i>
                </div>
            </section>
        </>
    );
}

export default Header;
