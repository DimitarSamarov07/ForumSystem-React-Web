import React from "react";


const CollapseCategoryItem = ({category}) => {
    return (
        <tr>
            <td>
                <div className="row">
                    <div className="col-1 text-center"><img src={category.imageUrl} style={{width: "40px"}}/></div>
                    <div className="col-10 ">
                        {/*<Link to={`/category/details/${category.objectId}`}>*/}
                        <a style={{fontSize: "1.5em"}} href="javascript:void(0)">
                            {category.title}
                        </a>
                        {/*</Link>*/}
                        {category.isRecentCategory ? <div className="badge badge-success">New</div> : null}
                        <br/>

                        {category.description}
                        <div className="text-muted">
                            {category.postsCount} Posts by
                            {category.usersCount} Users
                        </div>

                        <br/>

                    </div>


                </div>
            </td>
        </tr>
    );
}

export default CollapseCategoryItem;