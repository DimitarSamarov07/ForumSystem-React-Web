import React from "react";
import {useNavigate} from "react-router-dom";

const HeaderAdminElements = () => {
    const navigate = useNavigate();

    const onAdminPanelOpen = () => {
        navigate("/administration/index");

        // Reset styles
        window.location.reload();
    }

    return (
        <li className="dropdown show">
            <a href="#" className="btn  dropdown-toggle" data-toggle="dropdown" role="button"
               aria-haspopup="true"
               aria-expanded="false">Settings</a>
            <ul className="dropdown-menu">
                <a className="dropdown-item" onClick={onAdminPanelOpen} href="javascript:void(0)">Open Admin
                    Panel</a>
            </ul>
        </li>
    )
}

export default HeaderAdminElements;