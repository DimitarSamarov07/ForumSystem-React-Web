import {css} from "@emotion/react";
import React, {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import {PostService} from "../services/post.service.js";
import {UserService} from "../services/user.service.js";

const userService = new UserService();
const postService = new PostService();

const LOADER_COLOR = "#e95420";

const PostOwnerGuard = ({component: Component}) => {
    let {postId} = useParams();
    let [user, setUser] = useState();
    let [post, setPost] = useState();
    let [loading, setLoading] = useState(true);

    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;

    useEffect(() => {
        async function doEffect() {
            let retrievedUser = await userService.getCurrUser();
            let retrievedPost = await postService.retrievePost(postId)

            setUser(retrievedUser);
            setPost(retrievedPost)
            setLoading(false);
        }

        doEffect();
    })

    if (!loading) {
        if (!user || !post) {
            return (
                <Navigate to="/"/>
            )
        }
        if (user.objectId === post.author.objectId) {
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