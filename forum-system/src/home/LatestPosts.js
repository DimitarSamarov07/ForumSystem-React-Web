import {css} from "@emotion/react";
import React, {useEffect, useState} from "react";
import {HashLoader} from "react-spinners";
import {PostService} from "../services/post.service.js";
import LatestPostItem from "./LatestPostItem.js";

const postService = new PostService();
const LOADER_COLOR = "#e95420";

const LatestPosts = () => {

    let [posts, setPosts] = useState(null);

    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;

    useEffect(() => {
        async function doEffect() {
            setPosts(await postService.getLatestNPosts(5));
        }

        doEffect();
    }, [])

    const listItems = posts?.map((postItem) =>
        <LatestPostItem post={postItem}/>
    );

    if (!posts) {
        return <HashLoader color={LOADER_COLOR} css={override} size={150}/>
    }


    return (
        <div className="col-lg-6">
            <h3> Latest posts</h3>
            <table className="table table-hover table">
                <tbody>
                    {listItems}
                </tbody>
            </table>
        </div>
    )
}

export default LatestPosts;