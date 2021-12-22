import {css} from "@emotion/react";
import React, {useEffect, useState} from "react";
import {HashLoader} from "react-spinners";
import {PostService} from "../services/post.service.js";
import PopularPostItem from "./PopularPostItem.js";

const postService = new PostService();

const LOADER_COLOR = "#e95420";

const MostPopularPosts = () => {

    let [posts, setPosts] = useState(null);

    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;

    useEffect(() => {
        async function doEffect() {
            setPosts(await postService.getNMostPopularPosts(5))
        }

        doEffect();
    }, [])

    const listItems = posts?.map((postItem) =>
        <PopularPostItem post={postItem}/>
    );

    if (!posts) {
        return <HashLoader color={LOADER_COLOR} css={override} size={150}/>
    }

    return (
        <div className="col-lg-6">
            <table className="table table-hover">

                <thead>
                    <tr><h3> Most popular posts</h3></tr>
                </thead>
                <tbody>
                    {listItems}
                </tbody>

            </table>
        </div>
    )
}

export default MostPopularPosts;