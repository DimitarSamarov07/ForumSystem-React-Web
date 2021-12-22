import {Editor} from "@tinymce/tinymce-react";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {PostService} from "../services/post.service.js";

const postService = new PostService();

const PostEdit = () => {
    let {postId} = useParams();
    let [post, setPost] = useState(null);
    let [content, setContent] = useState("");
    let [contentError, setContentError] = useState("");

    useEffect(() => {
        async function doEffect() {
            setPost(await postService.retrievePost(postId));
        }

        doEffect()
    })

    let navigate = useNavigate();
    const editorRef = useRef(null);

    const onContentChange = (content) => {
        checkWordsCount();
        setContent(content);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        checkWordsCount();

        if (!contentError) {
            await postService.editPost(post.title, content, postId);
            navigate(`/post/details/${postId}`);
        }
    }

    const checkWordsCount = () => {
        let wordsCount = editorRef.current.plugins.wordcount.body.getWordCount();
        if (wordsCount === 0) {
            setContentError("Content is required.");
        } else {
            setContentError("");
        }
    }


    // noinspection RequiredAttributes
    return (
        <>
            <h1>Editing post with title <b>{post?.title}</b></h1>
            <form>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <Editor
                        id="content"
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={post?.content}
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
                </div>
                <button type="submit" onClick={onSubmit} className="btn btn-success">Submit</button>
                <p className="text-danger">Note: You can't edit the post's title</p>
            </form>


        </>
    )
}

export default PostEdit;