import React from "react";
import {NavLink} from "react-router-dom";

const ListCategoryPostsAdminItem = ({post, deleteSwal}) => {
    return (
        <tr>
            <td>{post.objectId}</td>
            <td>{post.title}</td>
            <td>{post.author.username}</td>
            <td>{post.parsedCreated}</td>
            <td>
                <NavLink
                    className="link-bl"
                    to={`/administration/post/edit/${post.category.objectId}/${post.objectId}`}>
                    Edit</NavLink>
                <a className="link-bl" href="javascript:void(0)" onClick={() => deleteSwal(post)}>Delete</a>
                <NavLink className="link-bl" to={`/post/details/${post.objectId}`}>View in forum</NavLink>
            </td>
        </tr>
    );
}

export default ListCategoryPostsAdminItem;