import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {UserService} from "../services/user.service.js";

const userService = new UserService();

const Login = () => {
    let [incorrectCredentials, setIncorrectCredentials] = useState(false);

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    let [isUsernameEmpty, setUsernameState] = useState(false);
    let [isPasswordEmpty, setPasswordState] = useState(false);
    const navigate = useNavigate();


    let onUsernameBlur = (e) => {
        if (!e.target.value) {
            setUsernameState(true);
        } else {
            setUsernameState(false);
        }
    }

    let onPasswordBlur = (e) => {
        if (!e.target.value) {
            setPasswordState(true);
        } else {
            setPasswordState(false);
        }
    }

    let onUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    let onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    let onFormSubmit = async (e) => {
        e.preventDefault();

        if (!isUsernameEmpty && !isPasswordEmpty) {
            setIncorrectCredentials(false);
            let success = await userService.loginUser(username, password);

            if (!success) {
                setIncorrectCredentials(true);
            } else {
                navigate("/");
            }

        }
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <section>
                    <form id="account">
                        <h4>Login</h4>
                        <hr/>
                        {incorrectCredentials ?
                            <p className="text-danger">Incorrect credentials. Please try again.</p>
                            : ""}
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input id="username" className="form-control" onChange={onUsernameChange}
                                   onBlur={onUsernameBlur} name="username"/>
                            {isUsernameEmpty ?
                                <span className="text-danger">Username is required.</span>
                                : ""}

                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input id="password" className="form-control" onChange={onPasswordChange}
                                   onBlur={onPasswordBlur} name="password"
                                   type="password"/>
                            {isPasswordEmpty ?
                                <span className="text-danger">Password is required.</span>
                                : ""}
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" onClick={onFormSubmit}>Log in</button>
                        </div>
                        <div className="form-group">
                            <p>
                                <Link to="/user/register">
                                    <a href="javascript:void(0)">Register as a new user</a>
                                </Link>
                            </p>
                        </div>
                    </form>
                </section>
            </div>
        </div>

    )
}

export default Login;