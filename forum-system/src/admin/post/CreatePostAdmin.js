import {Editor} from "@tinymce/tinymce-react";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import PostValidator from "../../helpers/post-validator.js";
import {PostService} from "../../services/post.service.js";
import {UserService} from "../../services/user.service.js";
import "./CreatePostAdmin.css";

const userService = new UserService();
const postService = new PostService();
const validator = new PostValidator();

const CreatePostAdmin = () => {
    let {categoryId} = useParams();
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [titleError, setTitleError] = useState("");
    let [descriptionError, setDescriptionError] = useState("");
    let [user, setUser] = useState();
    let navigate = useNavigate();

    useEffect(() => {
        async function doEffect() {
            setUser(await userService.getCurrUser());
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
        setDescription(content);
    }

    const checkWordsCount = () => {
        let wordsCount = editorRef.current.plugins.wordcount.body.getWordCount();
        if (wordsCount === 0) {
            setDescriptionError("Description is required.");
        } else {
            setDescriptionError("");
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        checkWordsCount();
        setTitleError(validator.titleErrorCheck(title));

        if (!titleError && !descriptionError) {
            await postService.createPost(title, description, categoryId, user.objectId)

            // TODO: Change later
            navigate("/administration/category/list");
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
                        <h3 className="box-title">Add Post</h3>
                    </div>
                    <form className="form-horizontal">
                        <div className="box-body">
                            <div className="form-group">
                                <label className="col-sm-2 control-label" htmlFor="title">Post Title</label>
                                <div className="col-sm-10">
                                    <input id="title" type="text" onChange={onTitleChange} className="form-control"
                                           placeholder='Enter post title'/>
                                    <span className="text-danger">{titleError}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Post Content</label>
                                <div className="col-sm-10">
                                    <Editor
                                        onInit={(evt, editor) => editorRef.current = editor}
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
                                <span className="text-danger">{descriptionError}</span>
                            </div>

                        </div>
                        <div className="box-footer">
                            <button type="reset" className="btn btn-default">Reset</button>
                            <button type="submit" onClick={onSubmit} className="btn btn-info pull-right">Create</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default CreatePostAdmin;