import React from "react";
import CollapseCategoryItem from "./CollapseCategoryItem.js";

const CategoriesCollapse = () => {
    let categories = [{
        "created": 1607368643000,
        "imageUrl": "https://res.cloudinary.com/dse6krwlt/image/upload/v1607774546/Unsigned/vttozhnaomigwaukcwip.png",
        "description": "Idk man just join if ya want to I don't give a shit :))",
        "title": "Yet another random bs :)",
        "isRecentCategory": true,
        "postsCount": 50,
        "usersCount": 30
    },
        {
            "created": 1607368643000,
            "imageUrl": "https://res.cloudinary.com/dse6krwlt/image/upload/v1607774546/Unsigned/vttozhnaomigwaukcwip.png",
            "description": "Idk man just join if ya want to I don't give a shit :))",
            "title": "Yet another random bs :)",
            "isRecentCategory": true,
            "postsCount": 50,
            "usersCount": 30
        }, {
            "created": 1607368643000,
            "imageUrl": "https://res.cloudinary.com/dse6krwlt/image/upload/v1607774546/Unsigned/vttozhnaomigwaukcwip.png",
            "description": "Idk man just join if ya want to I don't give a shit :))",
            "title": "Yet another random bs :)",
            "isRecentCategory": true,
            "postsCount": 50,
            "usersCount": 30
        },
        {
            "created": 1607368643000,
            "imageUrl": "https://res.cloudinary.com/dse6krwlt/image/upload/v1607774546/Unsigned/vttozhnaomigwaukcwip.png",
            "description": "Idk man just join if ya want to I don't give a shit :))",
            "title": "Yet another random bs :)",
            "isRecentCategory": true,
            "postsCount": 50,
            "usersCount": 30
        },
        {
            "created": 1607368643000,
            "imageUrl": "https://res.cloudinary.com/dse6krwlt/image/upload/v1607774546/Unsigned/vttozhnaomigwaukcwip.png",
            "description": "Idk man just join if ya want to I don't give a shit :))",
            "title": "Yet another random bs :)",
            "isRecentCategory": true,
            "postsCount": 50,
            "usersCount": 30
        }];

    // TODO: Implement category retrieval

    const listItems = categories.map((categoryItem) =>
        <CollapseCategoryItem category={categoryItem}/>
    );

    return (
        <table className="table table-bordered table-hover text-left">
            {listItems}
        </table>
    )

}

export default CategoriesCollapse;