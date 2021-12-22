import React from "react";
import {Link} from "react-router-dom";
import HomeBadges from "./HomeBadges.js";
import HomeRepliesCount from "./HomeRepliesCount.js";

const PopularPostItem = ({post}) => {
    return (
        <tr>
            <td>
                <div>
                    <Link to={`/post/details/${post.objectId}`}>{post.title}</Link>
                </div>
                by
                <div>
                    <HomeBadges item={post}/>
                </div>
                <div className="text-muted">
                    <HomeRepliesCount item={post}/>
                </div>
            </td>
        </tr>
    )
}

export default PopularPostItem