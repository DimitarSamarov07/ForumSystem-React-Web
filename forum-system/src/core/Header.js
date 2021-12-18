import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {UserService} from "../services/user.service.js";
import {doLogin, doLogout, useAuthDispatch, useAuthState} from "./auth-context.js";
import "./Header.css"
import HeaderAdminElements from "./HeaderAdminElements.js";
import HeaderGuestElements from "./HeaderGuestElements.js";

const userService = new UserService();

const Header = () => {
    const {user} = useAuthState();
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();

    useEffect(async () => {
        await doLogin(dispatch);
    }, [])

    let logout = async () => {
        await userService.logoutUser();
        doLogout(dispatch);
        navigate("/")
    }


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
                                    <Link to={`/profile/index/${user?.username}`}>
                                        <a className="nav-link text-dark"
                                           href="javascript:void(0)">Hello {user?.username}</a>
                                    </Link>
                                </li> : ""}

                            {user?.isAdmin ? <HeaderAdminElements/> : ""}
                            {user ?
                                <li className="nav-item">
                                    <a onClick={logout} href="javascript:void(0)" className="btn btn-link navbar-btn
                            navbar-link">Logout
                                    </a>
                                </li> : <HeaderGuestElements/>}
                        </ul>
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <Link to="/">
                                    <a className="nav-link text-dark" href="javascript:void(0)">Home</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/category/list">
                                    <a className="nav-link text-dark" href="javascript:void(0)">Categories</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

    );
}

export default Header;