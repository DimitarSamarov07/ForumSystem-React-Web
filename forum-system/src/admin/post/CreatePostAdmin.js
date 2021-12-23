import {css} from "@emotion/react";
import {Editor} from "@tinymce/tinymce-react";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {HashLoader} from "react-spinners";
import PostValidator from "../../helpers/post-validator.js";
import {CategoryService} from "../../services/category.service.js";
import {PostService} from "../../services/post.service.js";
import {UserService} from "../../services/user.service.js";
import "./styles/CreatePostAdmin.css";

const userService = new UserService();
const postService = new PostService();
const categoryService = new CategoryService();
const validator = new PostValidator();

const LOADER_COLOR = "#e95420";

const CreatePostAdmin = () => {
    let {categoryId} = useParams();
    let [title, setTitle] = useState("");
    let [invalid, setInvalid] = useState(false);
    let [loading, setLoading] = useState(true);
    let [description, setDescription] = useState("");
    let [titleError, setTitleError] = useState("");
    let [descriptionError, setDescriptionError] = useState("");
    let [user, setUser] = useState();
    let navigate = useNavigate();

    useEffect(() => {
        async function doEffect() {
            if (!categoryId || !await categoryService.retrieveCategoryById(categoryId)) {
                setInvalid(true);
            }
            setUser(await userService.getCurrUser());
            setLoading(false);
        }

        doEffect()
    }, [categoryId])

    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;

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
            navigate("/administration/post/list/" + categoryId);
        }
    }

    if (loading) {
        return <HashLoader loading={true} size={150} color={LOADER_COLOR} css={override}/>;
    } else {
        if (invalid) {
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
                            <button type="submit" onClick={onSubmit} className="btn btn-info pull-right">Create
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default CreatePostAdmin;