import React from "react";

const HomeBadges = ({item}) => {
    let badge =
        // <Link to={`/profile/index/${item.author.username}`}>
        <a href="javascript:void(0)"
           className="author-name badge badge-success">{item.author.username}</a>
    // </Link>;


    if (item.author.isAdmin) {
        badge =
            // <Link to={`/profile/index/${item.author.username}`}>
            <a href="javascript:void(0)"
               className="author-name badge badge-dark">{item.author.username}</a>
        // </Link>;
    }


    return badge;
}

export default HomeBadges;