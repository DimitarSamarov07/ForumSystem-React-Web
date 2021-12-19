import React from "react";
import {Link} from "react-router-dom";

const CategoryListItem = ({category}) => {
    let postsAndUsersStats;

    if (category.postsCount === 0 && category.usersCount === 0) {
        postsAndUsersStats =
            <div className="text-muted">
                {category.postsCount} Posts by
                {category.usersCount} Users
            </div>;
    } else if (category.postsCount === 1 && category.usersCount === 1) {
        postsAndUsersStats =
            <div className="text-muted">
                {category.postsCount} Post by
                {category.usersCount} User
            </div>;
    } else if (category.postsCount >= 2 && category.usersCount === 1) {
        postsAndUsersStats =
            <div className="text-muted">
                {category.postsCount} Posts by
                {category.usersCount} User
            </div>;
    } else if (category.postsCount >= 2 && category.usersCount >= 2) {
        postsAndUsersStats = <div className="text-muted">
            {category.postsCount} Posts by
            {category.usersCount} Users
        </div>;
    } else {
        postsAndUsersStats = <div className="text-muted">
            0 Posts by
            0 Users
        </div>;
    }

    return (
        <tr>
            <td>
                <div className="row">
                    <div className="col-1 text-center"><img src={category.imageUrl} style={{width: "80px"}}/>
                    </div>
                    <div className="col-10 ">
                        <Link to={`/category/details/${category.objectId}`}>
                            <a style={{fontSize: "1.5em"}}>
                                {category.title}
                            </a>
                        </Link>

                        {category.isRecentCategory ? <div className="badge badge-success"> New</div> : ""}
                        <br/>
                        {category.description}
                        {postsAndUsersStats}
                    </div>


                </div>
            </td>
        </tr>
    )
}

export default CategoryListItem;