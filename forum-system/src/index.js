import Backendless from "backendless";
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./core/auth-context.js";
import Layout from "./core/Layout.js";
import Home from './home/Home.js';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from "./user/Login.js";
import Register from "./user/Register.js";

Backendless.serverURL = "https://eu-api.backendless.com";
Backendless.initApp(process.env.REACT_APP_BACKENDLESS_APP_ID, process.env.REACT_APP_BACKENDLESS_JS_API_KEY)


ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route exact path="/" element={<Home/>}/>
                        <Route path="user">
                            <Route path={"login"} element={<Login/>}/>
                            <Route path={"register"} element={<Register/>}/>
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
