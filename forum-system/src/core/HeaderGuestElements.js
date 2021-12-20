import React from "react";
import {NavLink} from "react-router-dom";


const HeaderGuestElements = () => {
    return (
        <>
            <li className="nav-item">
                <NavLink className="nav-link text-dark" to="/user/register">Register</NavLink>

            </li>
            <li className="nav-item">
                <NavLink className="nav-link text-dark" to="/user/login">Login</NavLink>
            </li>
        </>
    )
}

export default HeaderGuestElements;