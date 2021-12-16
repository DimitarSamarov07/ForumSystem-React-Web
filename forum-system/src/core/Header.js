import React from "react";
import "./Header.css"
import HeaderAdminElements from "./HeaderAdminElements.js";
import HeaderGuestElements from "./HeaderGuestElements.js";
import Logout from "./Logout.js";

const Header = () => {
    let user = {
        "isAdmin": true,
        "username": "Jeff_The_Leaf"
    };

    return (
        <header>
            <nav
                className="navbar navbar-expand-sm navbar-expand-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container">
                    <a className="navbar-brand logo-center"><i style={{fontSize: "1.5em", marginRight: "3px"}}
                                                               className="far fa-comments"/>
                        ForumSystem</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target=".navbar-collapse"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
                        <ul className="navbar-nav">
                            {user ?
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="javascript:void(0)"
                                       routerLink={`/profile/index/${user.username}`}>Hello {user.username}</a>
                                </li> : ""}

                            {user.isAdmin ? <HeaderAdminElements/> : ""}
                            {user ? <Logout/> : <HeaderGuestElements/>}
                        </ul>
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="javascript:void(0)" routerLink="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="javascript:void(0)"
                                   routerLink="/category/list">Categories</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

    );
}

export default Header;