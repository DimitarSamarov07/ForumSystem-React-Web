import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserService} from "../services/user.service.js";

let validator = require("email-validator");
let userService = new UserService();

const Register = () => {
    let [usernameError, setUsernameError] = useState("");
    let [username, setUsername] = useState("");
    let [emailError, setEmailError] = useState("");
    let [email, setEmail] = useState("");
    let [passwordError, setPasswordError] = useState("");
    let [password, setPassword] = useState("");
    let [repeatPassError, setRepeatPassError] = useState("");
    let [repeatPass, setRepeatPass] = useState("");
    const navigate = useNavigate();

    let onUsernameChange = (e) => {
        let usernameValue = e.target.value;
        setUsername(usernameValue);

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
        setEmail(emailValue);

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
        setRepeatPass(repeatPassValue);

        if (!repeatPassValue) {
            setRepeatPassError("Repeat password is required.")
        } else if (repeatPassValue !== password) {
            setRepeatPassError("Passwords do not match.")
        } else {
            setRepeatPassError("");
        }
    }


    let onFormSubmit = async (e) => {
        e.preventDefault();
        if (!usernameError && !emailError && !passwordError &&
            !repeatPassError && username && email && password && repeatPass === password) {

            let isEmailUnique = await userService.verifyEmailUnique(email);
            let isUsernameUnique = await userService.verifyUsernameUnique(username);

            if (!isEmailUnique) {
                setEmailError("Email is already in use.")
            }
            if (!isUsernameUnique) {
                setUsernameError("Username is already in use.")
            }

            await userService.registerNewUser(username, email, password);
            navigate("/");
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
                    <button type="submit" onClick={onFormSubmit} className="btn btn-primary">Register</button>
                </form>
            </div>
        </div>

    );
}

export default Register;