import React from "react";

const HeaderAdminElements = () => {
    return (
        <li className="dropdown show">
            <a href="#" className="btn  dropdown-toggle" data-toggle="dropdown" role="button"
               aria-haspopup="true"
               aria-expanded="false">Settings</a>
            <ul className="dropdown-menu">
                <a className="dropdown-item" href="javascript:void(0)"
                   routerLink="/administration/category/list">Open Admin
                    Panel</a>
            </ul>
        </li>
    )
}

export default HeaderAdminElements;