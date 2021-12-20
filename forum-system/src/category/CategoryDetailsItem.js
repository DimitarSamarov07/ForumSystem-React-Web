import moment from "moment";
import React from "react";
import {Link, NavLink} from "react-router-dom";


const CategoryDetailsItem = ({category, post}) => {
    let repliesCountItem;

    if (post.repliesCount === 0) {
        repliesCountItem = <div>No replies</div>;
    } else if (post.repliesCount === 1) {
        repliesCountItem = <div>1 reply</div>;
    } else if (post.repliesCount >= 2) {
        repliesCountItem = <div>{post.repliesCount} replies</div>;
    }

    const convertDate = (date) => {
        return moment(date).format("DD/MM/YYYY hh:mm:ss");
    }

    return (
        <tr>
            <td>
                <div>
                    <div style={{fontSize: "1.5em"}}>
                        <Link to={`/post/details/${post.objectId}`}>{post.title}</Link>
                    </div>
                    <div>
                        <h6 style={{marginBottom: 0}}>by</h6>

                        {post.author.isAdmin ?
                            <a className="badge badge-dark"
                               href="javascript:void(0)">{post.author.username}</a>
                            :
                            <NavLink className="badge badge-success" to={`/profile/index/${post.author.username}`}>
                                {post.author.username}
                            </NavLink>
                        }
                    </div>
                    <div><em>Posted on: <b>{convertDate(category.created)}</b></em></div>
                    {repliesCountItem}
                </div>
            </td>
        </tr>
    )
}

export default CategoryDetailsItem;