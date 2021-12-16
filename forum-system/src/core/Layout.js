import React from 'react';
import {Outlet} from "react-router-dom";
import Footer from "./Footer.js";
import Header from './Header';

const Layout = () => {
    return (
        <>
            <Header/>
            <main>
                <div className="container">
                    <Outlet/>
                </div>
            </main>
            <Footer/>
        </>
    );
};

export default Layout;