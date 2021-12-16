import React from "react";
import HomeBadges from "./HomeBadges.js";
import HomeRepliesCount from "./HomeRepliesCount.js";

const LatestPostItem = ({post}) => {

    return (
        <tr>
            <td>
                {/*<Link to={`/post/details/${post.objectId}`}>*/}
                <div><a href="javascript:void(0)">{post.title}</a></div>
                {/*</Link>*/}
                <div>
                    <h6 style={{"margin-bottom": 0}}>by</h6>
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