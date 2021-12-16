import React from "react";
import {Link} from "react-router-dom";

const HeaderGuestElements = () => {
    return (
        <>
            <li className="nav-item">
                <Link to="/user/register">
                    <a className="nav-link text-dark" href="javascript:void(0)"
                       routerLink="/user/register">Register</a>
                </Link>

            </li>
            <li className="nav-item">
                <Link to="/user/login">
                    <a className="nav-link text-dark" href="javascript:void(0)"
                       routerLink="/user/login">Login</a>
                </Link>

            </li>
        </>
    )
}

export default HeaderGuestElements;