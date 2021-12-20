import React from "react";
import {NavLink} from "react-router-dom";


const CollapseCategoryItem = ({category}) => {
    return (
        <tr>
            <td>
                <div className="row">
                    <div className="col-1 text-center"><img src={category.imageUrl} style={{width: "40px"}}
                                                            alt="category-image"/></div>
                    <div className="col-10 ">
                        <NavLink style={{fontSize: "1.5em"}} to={`/category/details/${category.objectId}`}>
                            {category.title}
                        </NavLink>
                        {category.isRecentCategory ? <div className="badge badge-success">New</div> : null}
                        <br/>

                        {category.description}
                        <div className="text-muted">
                            {category.postsCount} Posts by {category.usersCount} Users
                        </div>

                        <br/>

                    </div>


                </div>
            </td>
        </tr>
    );
}

export default CollapseCategoryItem;