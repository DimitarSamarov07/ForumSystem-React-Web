import React from "react";
import {Link} from "react-router-dom";

const AdminSidebar = () => {
    return (
        <ul className="sidebar-menu" data-widget="tree">
            <li className="header">Settings</li>
            <li className="treeview">
                <a>
                    <i className="fa fa-link"/> <span>Categories</span>
                    <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right"/>
            </span>
                </a>
                <ul className="treeview-menu">
                    <li>
                        <Link to="/administration/category/create">Create</Link>
                    </li>
                    <li>
                        <Link to="/administration/category/list">List all</Link>
                    </li>
                </ul>
            </li>
        </ul>
    );
}

export default AdminSidebar;