import React from "react";
import {Outlet} from "react-router-dom";
import AdminSidebar from "./AdminSidebar.js";

const AdminLayout = () => {
    import("./AdminLayout.css");

    return (
        <>

            <body className="hold-transition skin-blue sidebar-mini">
                <div className="wrapper">
                    {/*Main Header*/}
                    <header className="main-header">
                        {/*Logo*/}
                        <a className="logo">
                            <span className="logo-mini"><b>:</b>)</span>
                            <span className="logo-lg"><b>ForumSystem</b>Panel</span>
                        </a>
                        {/*Header Navbar*/}
                        <nav className="navbar navbar-static-top" role="navigation">
                            <a href="javascript:void(0)" className="sidebar-toggle" data-toggle="push-menu"
                               role="button">
                                <span className="sr-only">Toggle navigation</span>
                            </a>
                        </nav>
                    </header>
                    <aside className="main-sidebar">
                        <section className="sidebar">
                            <AdminSidebar/>
                        </section>
                    </aside>
                    <div className="content-wrapper">
                        <Outlet/>
                    </div>
                    {/*Main Footer*/}
                    <footer className="main-footer">
                        <strong>Copyright ©2020 <b>ForumSystem</b>.</strong> All rights reserved.
                    </footer>
                </div>
            </body>
        </>

    )
}

export default AdminLayout;