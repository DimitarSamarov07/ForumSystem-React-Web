import React from "react";
import HomeBadges from "./HomeBadges.js";
import HomeRepliesCount from "./HomeRepliesCount.js";

const PopularPostItem = ({post}) => {
    return (
        <tr>
            <td>
                <div>
                    {/*<Link to={`/post/details/${post.objectId}`}>*/}
                    <a href="javascript:void(0)">{post.title}</a>
                    {/*</Link>*/}
                </div>
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