import {css} from "@emotion/react";
import * as moment from "moment";
import React from "react";
import {Link} from "react-router-dom";
import {HashLoader} from "react-spinners";

const LOADER_COLOR = "#e95420";

const CreateReplyOriginalPostView = ({post}) => {
    let postId = post?.objectId;

    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;

    const getConvertedDate = (created) => {
        return moment(created).format("DD/MM/YYYY hh:mm:ss");
    }


    if (!post) {
        return (
            <HashLoader loading={true} size={150} color={LOADER_COLOR} css={override}/>
        )
    }

    post.parsedCreated = getConvertedDate(post.created);
    return (
        <div>
            <Link to={`/post/details/${postId}`}>Go back to post</Link>

            <br/>
            <br/>

            <div className="card">
                <div className="card-header">
                    Original post:
                </div>
                <div className="card-body row">
                    <div className="col-2 text-center">
                        <img src={post?.author.profileImageUrl} alt="author-pfp" width="60"/>

                        <br/>
                        <Link to={`/profile/index/${post?.author.username}`}>{post?.author.username}</Link>

                        {post.author.isAdmin ?
                            <>
                                <br/>
                                <p className="badge badge-dark" style={{width: "75px"}}>Admin</p>
                            </>
                            :
                            <>
                                <br/>
                                <p className="badge badge-success" style={{width: "70px"}}>User</p>
                                <br/>
                            </>
                        }
                        <br/>
                        Points:
                        {post.author.karmaPoints}

                    </div>
                    <div className="col-10">

                        <p className="card-text" dangerouslySetInnerHTML={{__html: post?.content}}/>

                    </div>
                </div>
                <div className="card-footer text-muted">
                    Posted on: {post?.parsedCreated}
                </div>
            </div>
        </div>
    )
}

export default CreateReplyOriginalPostView