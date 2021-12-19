import React from "react";
import logo from "./404.png"
import "./NotFound.css"

const NotFound = () => {
    return (
        <>
            <body className="body-not-found">
                <div className="wrap">
                    <div className="banner">
                        <img src={logo} alt=""/>
                    </div>
                    <div className="page">
                        <h2>Dude, we can't find that page!</h2>
                        <br/>
                        <br/>
                    </div>
                </div>
            </body>
        </>
    )
}

export default NotFound;