import React from "react";
import {Link} from "react-router-dom";
import sanitizeHtml from "sanitize-html";

const PostDetailsReplyItem = ({reply, currUser}) => {
    return (
        <>
            <br/>
            <div className="card">
                {currUser.isAdmin ?
                    <Link className="btn btn-custom-post" to={`/reply/edit/${reply.objectId}`}>
                        <i className="fa fa-edit"> Edit</i></Link>
                    : ""
                }

                <div className="card-body row">
                    <div className="col-2 text-center">
                        <img src={reply.author.profileImageUrl} className="img-circle-post"/>
                        <br/>

                        <Link to={`/profile/index/${reply.author.username}`}>
                            {reply.author.username}</Link>

                        {currUser.isAdmin ?
                            <>
                                <br/>
                                <p className="badge badge-dark" style={{width: "60px"}}>Admin</p>
                                <br/>
                            </>
                            :
                            <>
                                <p className="badge badge-success" style={{width: "60px"}}>User</p>
                                <br/>
                            </>
                        }

                        Points: {reply.author.karmaPoints}

                    </div>
                    <div className="col-10">
                        <p className="card-text" dangerouslySetInnerHTML={{__html: sanitizeHtml(reply.content)}}/>
                    </div>
                </div>
                <div className="card-footer text-muted">
                    Posted on: {reply.parsedCreated}
                </div>
            </div>

        </>
    )
}

export default PostDetailsReplyItem;