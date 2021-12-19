import Backendless from "backendless";
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AdminLayout from "./admin/AdminLayout";
import AdminSidebar from "./admin/AdminSidebar.js";
import {AuthProvider} from "./core/auth-context.js";
import Layout from "./core/Layout.js";
import NotFound from "./core/NotFound/NotFound.js";
import Home from './home/Home.js';
import './index.css';
import Login from "./user/Login.js";
import Register from "./user/Register.js";

Backendless.serverURL = "https://eu-api.backendless.com";
Backendless.initApp(process.env.REACT_APP_BACKENDLESS_APP_ID, process.env.REACT_APP_BACKENDLESS_JS_API_KEY)

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route exact path="/" element={<Home/>}/>
                        <Route path="user">
                            <Route path={"login"} element={<Login/>}/>
                            <Route path={"register"} element={<Register/>}/>
                        </Route>
                        <Route path="*" element={<NotFound/>}/>
                    </Route>
                    <Route path="administration" element={<AdminLayout/>}>
                        <Route path="index" element={<AdminSidebar/>}/>
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App;