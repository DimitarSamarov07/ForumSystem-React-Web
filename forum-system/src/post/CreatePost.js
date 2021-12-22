import {Editor} from "@tinymce/tinymce-react";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import PostValidator from "../helpers/post-validator.js";
import {CategoryService} from "../services/category.service.js";
import {PostService} from "../services/post.service.js";
import {UserService} from "../services/user.service.js";

const postService = new PostService();
const categoryService = new CategoryService();
const userService = new UserService();
const validator = new PostValidator();

const CreatePost = () => {
    let {categoryId} = useParams();
    let [category, setCategory] = useState();
    let [title, setTitle] = useState("");
    let [content, setContent] = useState("");
    let [titleError, setTitleError] = useState("");
    let [contentError, setContentError] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        async function doEffect() {
            setCategory(await categoryService.retrieveCategoryById(categoryId))
        }

        doEffect()
    })

    const editorRef = useRef(null);

    const onTitleChange = (e) => {
        let content = e.target.value;
        setTitleError(validator.titleErrorCheck(content));
        setTitle(content);
    }

    const onContentChange = (content) => {
        checkWordsCount();
        setContent(content);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        checkWordsCount();
        setTitleError(validator.titleErrorCheck(content));

        if (!titleError && !contentError) {
            const {objectId: userId} = await userService.getCurrUser();
            const postId = await postService.createPost(title, content, categoryId, userId);
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
            <h1>New Post in <b>{category?.title}</b></h1>
            <form className="form-group">
                <div className=" form-group">
                    <label htmlFor="title">Title</label>
                    <input id=" title" onChange={onTitleChange} className="form-control"/>
                    <span className="text-danger">{titleError}</span>
                </div>
                <div className=" form-group">
                    <label htmlFor="content">Content</label>
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
                <button type="reset" className="btn btn-warning">Reset</button>
                <button color="primary" className=" btn btn-danger" type="submit" onClick={onSubmit}>Create</button>

            </form>

        </>
    )
}

export default CreatePost;