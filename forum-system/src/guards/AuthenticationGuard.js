import {css} from "@emotion/react";
import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import {UserService} from "../services/user.service.js";

const userService = new UserService();
const LOADER_COLOR = "#e95420";

const AuthenticationGuard = ({component: Component}) => {
    let [user, setUser] = useState();
    let [loading, setLoading] = useState(true);

    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;

    useEffect(() => {
        async function doEffect() {
            let retrievedUser = await userService.getCurrUser();
            setUser(retrievedUser);
            setLoading(false);
        }

        doEffect();
    })

    if (!loading) {
        if (user) {
            return (
                <Component/>
            )
        } else {
            return (
                <Navigate to="/"/>
            )
        }
    }

    return (
        <ClipLoader color={LOADER_COLOR} size={150} css={override}/>
    )
}

export default AuthenticationGuard;