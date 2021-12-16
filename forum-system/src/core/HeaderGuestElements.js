import React from "react";

const HeaderGuestElements = () => {
    return (
        <>
            <li className="nav-item">
                <a className="nav-link text-dark" href="javascript:void(0)"
                   routerLink="/user/register">Register</a>
            </li>
            <li className="nav-item">
                <a className="nav-link text-dark" href="javascript:void(0)"
                   routerLink="/user/login">Login</a>
            </li>
        </>
    )
}

export default HeaderGuestElements;