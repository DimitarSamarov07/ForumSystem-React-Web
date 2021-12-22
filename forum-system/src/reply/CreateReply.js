import {Editor} from "@tinymce/tinymce-react";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {PostService} from "../services/post.service.js";
import {ReplyService} from "../services/reply.service.js";
import {UserService} from "../services/user.service.js";
import CreateReplyOriginalPostView from "./CreateReplyOriginalPostView.js";

const postService = new PostService();
const replyService = new ReplyService();
const userService = new UserService();

const CreateReply = () => {
    let {postId} = useParams();
    let [post, setPost] = useState(null);
    let [currUser, setCurrUser] = useState(null);
    let [content, setContent] = useState("");
    let [contentError, setContentError] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        async function doEffect() {
            let retrievedPost = await postService.retrievePost(postId);
            let retrievedUser = await userService.getCurrUser();

            setPost(retrievedPost);
            setCurrUser(retrievedUser);
        }

        doEffect();
    }, [])

    let editorRef = useRef(null);

    const checkWordsCount = () => {
        let wordsCount = editorRef.current.plugins.wordcount.body.getWordCount();
        if (wordsCount === 0) {
            setContentError("Content is required.");
        } else {
            setContentError("");
        }
    }

    const onContentChange = (content) => {
        checkWordsCount();
        setContent(content);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        checkWordsCount();
        if (!contentError) {
            const {objectId: userId} = await userService.getCurrUser();
            await replyService.createReply(postId, userId, content);
            navigate(`/post/details/${postId}`);
        }
    }


    // noinspection RequiredAttributes
    return (
        <>
            <h1>Add reply to: <b>{post?.title}</b></h1>
            {<CreateReplyOriginalPostView post={post}/>}
            <br/>

            <div>
                <form>

                    <div className="form-group">
                        <label htmlFor="content">Reply as: <b>{currUser?.username}</b></label>
                        <Editor
                            id="content"
                            onInit={(evt, editor) => editorRef.current = editor}
                            onEditorChange={onContentChange}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                            }}
                        />
                        <span className="text-danger">{contentError}</span>

                    </div>
                    <button className="btn btn-primary" onClick={onSubmit} type="submit">Submit reply</button>
                    <button type="reset" className="btn btn-danger">Reset</button>
                </form>
            </div>
        </>
    )
}

export default CreateReply;