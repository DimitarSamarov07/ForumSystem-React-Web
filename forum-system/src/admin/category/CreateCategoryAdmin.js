import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {descriptionErrorCheck, titleErrorCheck} from "../../helpers/category-validator.js";
import {CategoryAdminService} from "../../services/category-admin.service.js";

const categoryAdminService = new CategoryAdminService();

const CreateCategoryAdmin = () => {
    let [titleError, setTitleError] = useState("");
    let [descriptionError, setDescriptionError] = useState("");
    let [selectedImgError, setSelectedImgError] = useState("");
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [selectedImg, setSelectedImg] = useState();
    let navigate = useNavigate();

    const onTitleChange = (e) => {
        let newValue = e.target.value;
        setTitleError(titleErrorCheck(newValue));
        setTitle(newValue);
    }

    const onDescriptionChange = (e) => {
        let newValue = e.target.value;
        setDescriptionError(descriptionErrorCheck(newValue));
        setDescription(newValue);
    }

    const onImageChange = (e) => {
        let newValue = e.target.files[0];
        setSelectedImgError("");
        setSelectedImg(newValue);
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();

        setTitleError(titleErrorCheck(title));
        setDescriptionError(descriptionErrorCheck(description));

        if (!selectedImg) {
            setSelectedImgError("Image is required.");
        } else if (!titleError && !descriptionError) {
            await categoryAdminService.createNewCategory(title, description, selectedImg)
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
                        <h3 className="box-title">Add Category</h3>
                    </div>
                    <form encType="multipart/form-data">
                        <div className="box-body">
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Category Title</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" onChange={onTitleChange}
                                           placeholder="Enter category title"/>
                                    <span className="text-danger">{titleError}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Category Description</label>
                                <div className="col-sm-10">
                                    <input type="text" onChange={onDescriptionChange} className="form-control"
                                           placeholder="Enter category description"/>
                                    <span className="text-danger">{descriptionError}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label" htmlFor="image">Upload Forum Image</label>
                                <br/>
                                <input type="file" id="image" onChange={onImageChange} className="btn btn-dark"/>
                                <span className="text-danger">{selectedImgError}</span>
                                <br/>

                                <p className="text-danger">Make sure to use high-resolution images with aspect ratio
                                    16:9</p>
                                <br/>
                            </div>

                        </div>
                        <div className="box-footer">
                            <button type="reset" className="btn btn-default">Reset</button>
                            <button type="submit" onClick={onFormSubmit} className="btn btn-info pull-right">Create
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}

export default CreateCategoryAdmin;

