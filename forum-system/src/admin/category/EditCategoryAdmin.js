import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {CategoryValidator} from "../../helpers/category-validator.js";
import {CategoryAdminService} from "../../services/category-admin.service.js";

const categoryAdminService = new CategoryAdminService();
const validator = new CategoryValidator();

const EditCategoryAdmin = () => {
    let {id: categoryId} = useParams();
    let [titleError, setTitleError] = useState("");
    let [descriptionError, setDescriptionError] = useState("");
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [selectedImg, setSelectedImg] = useState();
    let navigate = useNavigate();

    useEffect(() => {
        async function doEffect() {
            let result = await categoryAdminService.retrieveCategoryById(categoryId);
            if (result) {
                setTitle(result.title);
                setDescription(result.description);
            } else {
                navigate("/administration/category/list");
            }
        }

        doEffect()
    }, [categoryId, navigate])

    const onTitleChange = (e) => {
        let newValue = e.target.value;
        setTitleError(validator.titleErrorCheck(newValue));
        setTitle(newValue);
    }

    const onDescriptionChange = (e) => {
        let newValue = e.target.value;
        setDescriptionError(validator.descriptionErrorCheck(newValue));
        setDescription(newValue);
    }

    const onImageChange = (e) => {
        let newValue = e.target.files[0];
        setSelectedImg(newValue);
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();

        setTitleError(validator.titleErrorCheck(title));
        setDescriptionError(validator.descriptionErrorCheck(description));

        if (!titleError && !descriptionError) {
            await categoryAdminService.editCategoryById(categoryId, title, description, selectedImg);
            navigate("/administration/category/list");
        }
    }


    return (
        <>
            <section className="content-header">
                <h1>
                    Categories
                </h1>
            </section>
            <section className="content container-fluid">
                <div className="box box-info">
                    <div className="box-header with-border">
                        <h3 className="box-title">Update Category</h3>
                    </div>
                    <form encType="multipart/form-data">
                        <div className="box-body">
                            <div className="form-group">
                                <label className="col-sm-2 control-label">New Category Title</label>
                                <div className="col-sm-10">
                                    <input type="text" value={title} className="form-control" onChange={onTitleChange}
                                           placeholder="Enter category title"/>
                                    <span className="text-danger">{titleError}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">New Category Description</label>
                                <div className="col-sm-10">
                                    <input type="text" value={description} onChange={onDescriptionChange}
                                           className="form-control"
                                           placeholder="Enter category description"/>
                                    <span className="text-danger">{descriptionError}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label" htmlFor="image">Upload Category Image</label>
                                <br/>
                                <input type="file" id="image" onChange={onImageChange} className="btn btn-dark"/>
                                <br/>

                                <p className="text-danger">Make sure to use high-resolution images with aspect ratio
                                    16:9</p>
                                <br/>
                            </div>

                        </div>
                        <div className="box-footer">
                            <button type="submit" onClick={onFormSubmit} className="btn btn-info pull-right">Update
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}

export default EditCategoryAdmin;

