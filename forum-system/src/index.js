import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Layout from "./core/Layout.js";
import Home from './home/Home.js';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from "./user/Login.js";
import Register from "./user/Register.js";

ReactDOM.render(
    <React.StrictMode>
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
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
