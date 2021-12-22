import React from "react";
import {NavLink} from "react-router-dom";

const HomeBadges = ({item}) => {
    let badge =
        <NavLink to={`/profile/index/${item.author.username}`}
                 className="author-name badge badge-success">{item.author.username}</NavLink>


    if (item.author.isAdmin) {
        badge =
            <NavLink to={`/profile/index/${item.author.username}`}
                     className="author-name badge badge-dark">{item.author.username}</NavLink>
    }


    return badge;
}

export default HomeBadges;