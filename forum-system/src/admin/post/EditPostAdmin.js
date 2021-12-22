import {Editor} from "@tinymce/tinymce-react";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import PostValidator from "../../helpers/post-validator.js";
import {PostService} from "../../services/post.service.js";

const postService = new PostService();
const validator = new PostValidator();

const EditPostAdmin = () => {
    let {categoryId, postId} = useParams();
    let [title, setTitle] = useState("");
    let [post, setPost] = useState();
    let [content, setContent] = useState("");
    let [titleError, setTitleError] = useState("");
    let [contentError, setContentError] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        async function doEffect() {
            let result = await postService.retrievePost(postId)
            setTitle(result.title);
            setPost(result);
            changeEditorValueToDescription();
        }

        doEffect()
    }, [])


    const editorRef = useRef(null);

    const onTitleChange = (e) => {
        let content = e.target.value;
        setTitleError(validator.titleErrorCheck(content));
        setTitle(content);
    }

    const onDescriptionChange = (content) => {
        checkWordsCount();
        setContent(content);
    }

    const changeEditorValueToDescription = () => {
        console.log(content);

    }
    const checkWordsCount = () => {
        let wordsCount = editorRef.current.plugins.wordcount.body.getWordCount();
        if (wordsCount === 0) {
            setContentError("Description is required.");
        } else {
            setContentError("");
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        checkWordsCount();
        setTitleError(validator.titleErrorCheck(title));

        if (!titleError && !contentError) {
            await postService.editPost(title, content, postId)
            navigate("/administration/post/list/" + categoryId);
        }
    }

    // noinspection RequiredAttributes
    return (
        <>
            <section className="content-header">
                <h1>
                    Posts
                </h1>
            </section>
            <section className="content container-fluid">
                <div className="box box-info">
                    <div className="box-header with-border">
                        <h3 className="box-title">Update Post</h3>
                    </div>
                    <form className="form-horizontal">
                        <div className="box-body">
                            <div className="form-group">
                                <label className="col-sm-2 control-label" htmlFor="title">New Post Title</label>
                                <div className="col-sm-10">
                                    <input id="title" value={title} type="text" onChange={onTitleChange}
                                           className="form-control"
                                           placeholder='Enter post title'/>
                                    <span className="text-danger">{titleError}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">New Post Content</label>
                                <div className="col-sm-10">
                                    <Editor
                                        onInit={(evt, editor) => editorRef.current = editor}
                                        initialValue={post?.content}
                                        onEditorChange={onDescriptionChange}
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
                                <span className="text-danger">{contentError}</span>
                            </div>

                        </div>
                        <div className="box-footer">
                            <button type="reset" className="btn btn-default">Reset</button>
                            <button type="submit" onClick={onSubmit} className="btn btn-info pull-right">Update</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default EditPostAdmin;