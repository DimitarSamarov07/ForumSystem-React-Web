import React, {useState} from "react";

let validator = require("email-validator");

const Register = () => {
    let [usernameError, setUsernameError] = useState("");
    let [emailError, setEmailError] = useState("");
    let [passwordError, setPasswordError] = useState("");
    let [password, setPassword] = useState("");
    let [repeatPassError, setRepeatPassError] = useState("");

    let onUsernameChange = (e) => {
        let usernameValue = e.target.value;
        if (!usernameValue) {
            setUsernameError("Username is required.");
        } else {
            if (usernameValue.length < 5) {
                setUsernameError("Username should be at least 5 characters long.");
            } else if (usernameValue.length > 20) {
                setUsernameError("Username should be no more than 20 characters long.");
            } else {
                setUsernameError("");
            }
        }
    }

    let onEmailChange = (e) => {
        let emailValue = e.target.value;

        if (!emailValue) {
            setEmailError("Email is required.")
        } else if (!validator.validate(emailValue)) {
            setEmailError("Email should be valid.")
        } else {
            setEmailError("")
        }
    }

    let onPasswordChange = (e) => {
        let passwordValue = e.target.value;
        setPassword(passwordValue);
        if (!passwordValue) {
            setPasswordError("Password is required")
        } else {
            if (passwordValue.length < 8) {
                setPasswordError("Password should be at least 8 characters long.")
            } else if (passwordValue.length > 30) {
                setPasswordError("Password should be no more than 30 characters long.")
            } else {
                setPasswordError("");
            }
        }

    }

    let onRepeatPassChange = (e) => {
        let repeatPassValue = e.target.value;

        if (!repeatPassValue) {
            setRepeatPassError("Repeat password is required.")
        } else if (repeatPassValue !== password) {
            setRepeatPassError("Passwords do not match.")
        } else {
            setRepeatPassError("");
        }
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <form>
                    <h4>Create a new account.</h4>
                    <hr/>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input className="form-control" onChange={onUsernameChange} id="username" name="username"/>
                        <span className="text-danger">{usernameError}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input className="form-control" onChange={onEmailChange} id="email" name="email"/>
                        <span className="text-danger">{emailError}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" onChange={onPasswordChange} id="password" type="password"
                               name="password"/>
                        <span className="text-danger">{passwordError}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="repeatPassword">Repeat Password</label>
                        <input className="form-control" onChange={onRepeatPassChange} id="repeatPassword"
                               type="password"
                               name="repeatPassword"/>
                        <span className="text-danger">{repeatPassError}</span>
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </div>

    );
}

export default Register;