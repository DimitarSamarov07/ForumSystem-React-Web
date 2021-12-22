import {css} from "@emotion/react";
import React, {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import {ReplyService} from "../services/reply.service.js";
import {UserService} from "../services/user.service.js";

const userService = new UserService();
const replyService = new ReplyService();

const LOADER_COLOR = "#e95420";

const PostOwnerGuard = ({component: Component}) => {
    let {replyId} = useParams();
    let [user, setUser] = useState();
    let [reply, setReply] = useState();
    let [loading, setLoading] = useState(true);

    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;

    useEffect(() => {
        async function doEffect() {
            let retrievedUser = await userService.getCurrUser();
            let retrievedReply = await replyService.getReplyById(replyId)

            setUser(retrievedUser);
            setReply(retrievedReply)
            setLoading(false);
        }

        doEffect();
    })

    if (!loading) {
        if (!user || !reply) {
            return (
                <Navigate to="/"/>
            )
        }
        if (user.objectId === reply.author.objectId) {
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

export default PostOwnerGuard;