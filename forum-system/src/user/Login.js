import React, {useState} from "react";
import {Link} from "react-router-dom";

const Login = () => {
    let incorrectCredentials = false;
    let [isUsernameEmpty, setUsernameState] = useState(false);
    let [isPasswordEmpty, setPasswordState] = useState(false);


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
                            <input id="username" className="form-control" onBlur={onUsernameBlur} name="username"/>
                            {isUsernameEmpty ?
                                <span className="text-danger">Username is required.</span>
                                : ""}

                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input id="password" className="form-control" onBlur={onPasswordBlur} name="password"
                                   type="password"/>
                            {isPasswordEmpty ?
                                <span className="text-danger">Password is required.</span>
                                : ""}
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Log in</button>
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