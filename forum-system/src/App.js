import Backendless from "backendless";
import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import AdminLayout from "./admin/AdminLayout";
import CategoryListAllAdmin from "./admin/category/CategoryListAllAdmin.js";
import CreateCategoryAdmin from "./admin/category/CreateCategoryAdmin.js";
import EditCategoryAdmin from "./admin/category/EditCategoryAdmin.js";
import CreatePostAdmin from "./admin/post/CreatePostAdmin.js";
import EditPostAdmin from "./admin/post/EditPostAdmin.js";
import ListCategoryPostsAdmin from "./admin/post/ListCategoryPostsAdmin.js";
import CategoryDetails from "./category/CategoryDetails.js";
import CategoryList from "./category/CategoryList.js";
import {AuthProvider} from "./core/auth-context.js";
import Layout from "./core/Layout.js";
import NotFound from "./core/NotFound/NotFound.js";
import Home from './home/Home.js';
import './index.css';
import CreatePost from "./post/CreatePost.js";
import PostDetails from "./post/PostDetails.js";
import PostEdit from "./post/PostEdit.js";
import CreateReply from "./reply/CreateReply.js";
import EditReply from "./reply/EditReply.js";
import Login from "./user/Login.js";
import ProfilePage from "./user/ProfilePage.js";
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
                            <Route path="login" element={<Login/>}/>
                            <Route path="register" element={<Register/>}/>
                        </Route>
                        <Route path="category">
                            <Route path="list" element={<CategoryList/>}/>
                            <Route path="details/:id" element={<CategoryDetails/>}/>
                        </Route>
                        <Route path="post">
                            <Route path="create/:categoryId" element={<CreatePost/>}/>
                            <Route path="details/:id" element={<PostDetails/>}/>
                            <Route path="edit/:postId" element={<PostEdit/>}/>
                        </Route>
                        <Route path="reply">
                            <Route path="create/:postId" element={<CreateReply/>}/>
                            <Route path="edit/:replyId" element={<EditReply/>}/>
                        </Route>
                        <Route path="profile">
                            <Route path="index/:username" element={<ProfilePage/>}/>
                        </Route>
                        <Route path="*" element={<NotFound/>}/>
                    </Route>
                    <Route path="administration" element={<AdminLayout/>}>
                        <Route exact path="/administration" element={<Navigate to="category/list"/>}/>
                        <Route path='category'>
                            <Route path="create" element={<CreateCategoryAdmin/>}/>
                            <Route path="list" element={<CategoryListAllAdmin/>}/>
                            <Route path="edit/:id" element={<EditCategoryAdmin/>}/>
                        </Route>
                        <Route path="post">
                            <Route path="create/:categoryId" element={<CreatePostAdmin/>}/>
                            <Route path="list/:categoryId" element={<ListCategoryPostsAdmin/>}/>
                            <Route path="edit/:categoryId/:postId" element={<EditPostAdmin/>}/>
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App;