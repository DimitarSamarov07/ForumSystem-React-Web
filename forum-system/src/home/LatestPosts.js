import React from "react";
import LatestPostItem from "./LatestPostItem.js";

const LatestPosts = () => {
    // TODO: Implement post retrieval

    let posts = [
        {
            "created": 1627604245000,
            "author": {
                "lastLogin": 1627604154000,
                "karmaPoints": 1,
                "userStatus": "ENABLED",
                "created": 1627603972000,
                "accountType": "BACKENDLESS",
                "isAdmin": false,
                "ownerId": "84C01195-1CAC-4187-A4F7-03A0ADC961E7",
                "socialAccount": "BACKENDLESS",
                "oAuthIdentities": null,
                "memberSince": null,
                "___class": "Users",
                "blUserLocale": "en",
                "profileImageUrl": "/assets/images/user.png",
                "updated": 1627637654000,
                "email": "bilyanazh@gmail.com",
                "objectId": "84C01195-1CAC-4187-A4F7-03A0ADC961E7",
                "username": "bileto"
            },
            "___class": "Posts",
            "ownerId": "84C01195-1CAC-4187-A4F7-03A0ADC961E7",
            "title": "My first Post",
            "updated": null,
            "objectId": "137AB7BE-D630-4804-9166-3FF58061727D",
            "content": "<p>idk what to put here</p>",
            "repliesCount": 0
        },
        {
            "created": 1629235619000,
            "author": {
                "lastLogin": 1629235479000,
                "karmaPoints": 0,
                "userStatus": "ENABLED",
                "created": 1629235478000,
                "accountType": "BACKENDLESS",
                "isAdmin": false,
                "ownerId": "22F6C927-3EC8-4351-A43C-D9B922748DCD",
                "socialAccount": "BACKENDLESS",
                "oAuthIdentities": null,
                "memberSince": null,
                "___class": "Users",
                "blUserLocale": "en",
                "profileImageUrl": "/assets/images/user.png",
                "updated": null,
                "email": "bainachev@gmail.com",
                "objectId": "22F6C927-3EC8-4351-A43C-D9B922748DCD",
                "username": "ivanovaa"
            },
            "___class": "Posts",
            "ownerId": "22F6C927-3EC8-4351-A43C-D9B922748DCD",
            "title": "trtrrrrrrrrrrrrrrrrrrrrrrrrrr",
            "updated": null,
            "objectId": "256B1150-4C1A-4C69-89EF-2A145178A1C7",
            "content": "",
            "repliesCount": 1
        },
    ]

    const listItems = posts.map((postItem) =>
        <LatestPostItem post={postItem}/>
    );

    return (
        <div className="col-lg-6">
            <h3> Latest posts</h3>
            <table className="table table-hover table">
                <tbody>
                    {listItems}
                </tbody>
            </table>
        </div>
    )
}

export default LatestPosts;