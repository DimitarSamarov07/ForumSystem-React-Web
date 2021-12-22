import React from "react";
import {Link} from "react-router-dom";
import HomeBadges from "./HomeBadges.js";
import HomeRepliesCount from "./HomeRepliesCount.js";

const LatestPostItem = ({post}) => {

    return (
        <tr>
            <td>
                <div><Link to={`/post/details/${post.objectId}`}>{post.title}</Link></div>
                <div>
                    <h6 style={{marginBottom: 0}}>by</h6>
                    <HomeBadges item={post}/>

                </div>
                <div className="text-muted">
                    <HomeRepliesCount item={post}/>
                </div>
            </td>
        </tr>
    )
}

export default LatestPostItem;