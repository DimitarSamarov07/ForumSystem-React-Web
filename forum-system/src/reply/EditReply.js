import {css} from "@emotion/react";
import {Editor} from "@tinymce/tinymce-react";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {HashLoader} from "react-spinners";
import {ReplyService} from "../services/reply.service.js";

const replyService = new ReplyService();

const LOADER_COLOR = "#e95420";

const EditReply = () => {
    let {replyId} = useParams()
    let [reply, setReply] = useState(null);
    let [content, setContent] = useState("");
    let [contentError, setContentError] = useState("");
    let navigate = useNavigate();

    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;

    useEffect(() => {
        async function doEffect() {
            let retrievedReply = await replyService.getReplyById(replyId);
            setContent(retrievedReply.content)
            setReply(retrievedReply)
        }

        doEffect();
    }, [replyId])

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
            await replyService.editReply(replyId, content);
            navigate(`/post/details/${reply.post.objectId}`);
        }
    }

    if (!reply) {
        return <HashLoader loading={true} size={150} color={LOADER_COLOR} css={override}/>;
    }


    // noinspection RequiredAttributes
    return (
        <>
            <h1>Editing reply created from user {reply.author.username}</h1>

            <div>
                <form>
                    <div className="form-group">
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue={reply.content}
                            onEditorChange={onContentChange}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: ['advlist autolink lists link image charmap print preview anchor', 'searchreplace visualblocks code fullscreen', 'insertdatetime media table paste code help wordcount'],
                                toolbar: 'undo redo | formatselect | ' + 'bold italic backcolor | alignleft aligncenter ' + 'alignright alignjustify | bullist numlist outdent indent | ' + 'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                            }}/>
                        <span className="text-danger">{contentError}</span>
                    </div>
                    <button className="btn btn-primary" onClick={onSubmit} type="submit">Submit reply</button>
                </form>
            </div>

        </>)
}

export default EditReply;