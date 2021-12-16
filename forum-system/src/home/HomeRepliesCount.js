import React from "react";

const HomeRepliesCount = ({item}) => {
    let replies = <span>No replies</span>;


    if (item?.repliesCount === 1) {
        replies = <span>1 Reply</span>;
    } else if (item.repliesCount >= 2) {
        replies = <span>{item.repliesCount} replies</span>;
    }

    return replies;
}

export default HomeRepliesCount;