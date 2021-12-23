import {css} from "@emotion/react";
import * as moment from 'moment';
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {HashLoader} from "react-spinners";
import {UserService} from "../services/user.service.js";
import ProfileImageUploadModal from "./ProfileImageUploadModal.js";

const userService = new UserService();

const LOADER_COLOR = "#e95420";

const ProfilePage = () => {
    let {username} = useParams();
    let [user, setUser] = useState(null);
    let [currUser, setCurrUser] = useState(null);

    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;

    useEffect(() => {
        async function doEffect() {
            let currUser = await userService.getCurrUser();

            let user = await userService.getUserByUsername(username);
            user.memberSince = moment(user.created).format("DD/MM/YYYY");

            setCurrUser(currUser);
            setUser(user);
        }

        doEffect()
    }, [username])


    if (!user) {
        return (
            <>
                <h1>User Profile</h1>
                <HashLoader size={150} color={LOADER_COLOR} css={override}/>;
            </>
        )
    }

    return (
        <>
            <h1>User Profile</h1>

            <div className="container body-content">
                <div className="row ">
                    <div className="col-md-4 text-center">
                        <img src={user.profileImageUrl} alt="author-pfp" className="img-circle-profile"/>
                    </div>


                    <div className="col-sm-8">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{user.username}</h5>
                                <p className="card-text">

                                    {user.isAdmin ?
                                        <>
                                            <span className="badge badge-dark">Admin</span>
                                            <br/>
                                        </>
                                        : ""}
                                    <span id="userRating">Current Karma: {user.karmaPoints}</span>
                                    <br/>
                                    <span id="userEmailLabel">Email: {user.email}</span> <br/>
                                    <span id="userCreatedLabel">Member Since: {user.memberSince}</span> <br/>
                                </p>
                                {user.objectId === currUser.objectId ?
                                    <ProfileImageUploadModal user={user}/> : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default ProfilePage;