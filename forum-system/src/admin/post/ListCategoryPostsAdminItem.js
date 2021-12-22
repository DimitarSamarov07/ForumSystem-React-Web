import React from "react";
import {NavLink, useNavigate} from "react-router-dom";

const ListCategoryPostsAdminItem = ({post, deleteSwal}) => {
    const navigate = useNavigate();

    const onViewInForumClick = () => {
        navigate(`/post/details/${post.objectId}`);

        // Force styles to reload
        window.location.reload();
    }

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
                <a className="link-bl" href="javascript:void(0)" onClick={onViewInForumClick}>View in forum</a>
            </td>
        </tr>
    );
}

export default ListCategoryPostsAdminItem;