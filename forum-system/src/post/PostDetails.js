import {css} from "@emotion/react";
import * as moment from "moment";
import React, {useEffect, useState} from "react";
import {Link, NavLink, useNavigate, useParams} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import sanitizeHtml from 'sanitize-html';
import {PostService} from "../services/post.service.js";
import {UserService} from "../services/user.service.js";
import VoteService from "../services/vote.service.js";
import PostDetailsReplyItem from "./PostDetailsReplyItem.js";

const postService = new PostService();
const userService = new UserService();
const voteService = new VoteService();
const LOADER_COLOR = "#e95420";

const PostDetails = () => {
    const {id: postId} = useParams();
    let [post, setPost] = useState(null);
    let [isCurrUserAuthor, setIsCurrUserAuthor] = useState(false);
    let [categoryId, setCategoryId] = useState(false);
    let [currUser, setCurrUser] = useState(null);
    let [postVotes, setPostVotes] = useState(0);
    let [dataReady, setDataReady] = useState(false);
    let navigate = useNavigate();

    const override = css`
      display: block;
      margin: auto;
    `;

    useEffect(() => {
        async function doEffect() {
            let retrievedPost = await postService.retrievePostWithReplies(postId);
            retrievedPost.parsedCreated = getConvertedDate(retrievedPost.created);

            let postVotes = await voteService.getPostVotesCount(postId);
            let currUser = await userService.getCurrUser();

            setCurrUser(currUser);
            setCategoryId(retrievedPost.category.objectId);
            setIsCurrUserAuthor(currUser?.objectId === retrievedPost.author.objectId);
            setPostVotes(postVotes);
            setPost(retrievedPost);

            setDataReady(true);
        }

        doEffect();
    }, [])

    let replyItems = post?.replies.map((reply) =>
        <PostDetailsReplyItem reply={reply} key={reply.objectId} currUser={currUser}/>
    )

    const getConvertedDate = (created) => {
        return moment(created).format("DD/MM/YYYY hh:mm:ss");
    }

    const sendVote = async (polarity) => {
        await voteService.registerVote(postId, currUser.objectId, polarity);

        let postVotes = await voteService.getPostVotesCount(postId);
        setPostVotes(postVotes);

        // Refresh the author object so the updated points appear
        let postShadow = Object.assign({}, post);
        postShadow.author = await userService.getUserById(postShadow.author.objectId);
        setPost(postShadow);
    }

    if (!dataReady) {
        return <ClipLoader loading={true} size={150} color={LOADER_COLOR} css={override}/>;
    }

    const redirectWithStyleReset = (url) => {
        navigate(url);

        // Force styles to reload
        window.location.reload();
    }

    return (
        <>
            <h1>{post.title}</h1>
            <Link to={`/category/details/${categoryId}`}>Back to category</Link>

            <div className="card">
                <div className="card-body row" style={{position: "relative"}}>
                    <div className="col-2 text-center">
                        <img src={post.author.profileImageUrl} className="img-circle-post"/>

                        <br/>
                        <Link to={`/profile/index/${post.author.username}`}>{post.author.username}</Link>

                        {!post.author.isAdmin ?
                            <>
                                <br/>
                                <p className="badge badge-success" style={{width: "70px"}}>User</p>
                                <br/>
                            </>
                            :
                            <>
                                <br/>
                                <p className="badge badge-dark" style={{width: "70px"}}>Admin</p>
                            </>
                        }

                        <br/>
                        Points: {post.author.karmaPoints}

                    </div>
                    <div className="col-10">

                        <p className="card-text" dangerouslySetInnerHTML={{__html: sanitizeHtml(post?.content)}}/>

                    </div>

                    {isCurrUserAuthor && !currUser?.isAdmin ?
                        <NavLink className="btn btn-custom-post" to={`/post/edit/${post.objectId}`}><i
                            className="fa fa-edit"> Edit</i></NavLink> : ""
                    }

                    {currUser?.isAdmin ?
                        <a className="btn btn-custom-post" href="javascript:void(0)"
                           onClick={() =>
                               redirectWithStyleReset(`/administration/post/edit/${categoryId}/${post.objectId}`)}>
                            <i className="fa fa-edit"> Edit</i></a> : ""
                    }
                </div>

                {currUser ?
                    <div className="card-footer text-muted">
                        Posted on: {post.parsedCreated}
                        <div>
                            <a href="javascript:void(0)" onClick={() => sendVote(true)}>
                                <i className="fa fa-thumbs-up"/>
                            </a>
                        </div>

                        <div id="votesCount">{postVotes}</div>
                        <div>
                            <a href="javascript:void(0)" onClick={() => sendVote(false)}>
                                <i className="fa fa-thumbs-down"/>
                            </a>
                        </div>
                    </div> : ""
                }

            </div>

            <br/>

            {replyItems.length > 0 ?
                <>
                    <b style={{fontSize: "30px"}}>Replies:</b>
                    {replyItems}
                </>
                :
                <div className="text-center text-primary">
                    <h3>There are no replies to this post</h3>
                </div>
            }


            <br/>


            {currUser ?
                <div className="row">
                    <span><NavLink className="btn btn-dark" to={`/reply/create/${postId}`}>Add a Reply</NavLink></span>
                </div>
                :
                <p className="text-center text-dark">
                    You must be a registered user to add a reply.
                    <NavLink className="text-primary" to="/user/login">Login</NavLink>
                    or
                    <NavLink className="text-primary" to="/user/register">Register</NavLink>
                    now.
                </p>}

        </>
    )
}

export default PostDetails;