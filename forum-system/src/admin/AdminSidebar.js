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
                        <Link to="/administration/category/create">
                            <a href="javascript:void(0)">Create</a>
                        </Link>
                    </li>
                    <li>
                        <Link to="/administration/category/list">
                            <a href="javascript:void(0)">List all</a>
                        </Link>
                    </li>
                </ul>
            </li>

            <li className="treeview">
                <a>
                    <i className="fa fa-link"/> <span>Posts</span>
                    <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right"/>
            </span>
                </a>
                <ul className="treeview-menu">
                    <li><a onClick="">Create</a>
                    </li>
                </ul>
            </li>
        </ul>
    );
}

export default AdminSidebar;