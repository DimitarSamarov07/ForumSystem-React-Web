import React from "react";
import {NavLink} from "react-router-dom";
import "./styles/CategoryListAllAdminItem.css"


const CategoryListAllAdminItem = ({category, deleteSwal}) => {


    return (
        <tr>

            <td>{category.objectId}</td>
            <td>{category.title}</td>
            <td>{category.description}</td>
            <td>{category.postsCount}</td>
            <td>{category.usersCount}</td>
            <td>
                <NavLink className="link-bl" to={`/administration/category/edit/${category.objectId}`}>Edit</NavLink>
                <a className="link-bl" onClick={() => deleteSwal(category)} href="javascript:void(0)">Delete</a>
                <NavLink className="link-bl" to={`/administration/post/list/${category.objectId}`}>View Posts</NavLink>
                <NavLink to={`/administration/post/create/${category.objectId}`}>Create Post</NavLink>
            </td>
        </tr>
    );
}

export default CategoryListAllAdminItem;