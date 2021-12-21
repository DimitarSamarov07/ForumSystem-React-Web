import {css} from "@emotion/react";
import React, {useEffect, useState} from "react";
import {HashLoader} from "react-spinners";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ScriptLoader from "../../helpers/script-loader.js";
import {CategoryAdminService} from "../../services/category-admin.service.js";
import "./CategoryListAllAdmin.css"
import CategoryListAllAdminItem from "./CategoryListAllAdminItem.js";

const categoryAdminService = new CategoryAdminService();
const scriptLoader = new ScriptLoader();
const LOADER_COLOR = "#367fa9";

const CategoryListAllAdmin = () => {
    let [categories, setCategories] = useState([]);
    let [hashLoaderActive, setHashLoaderActive] = useState(true);
    let [loadDatatables, setLoadDatatables] = useState(false);
    let [datatablesLoaded, setDatatablesLoaded] = useState(false);

    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;

    useEffect(() => {
        async function doEffect() {
            setCategories(await categoryAdminService.retrieveCategoriesWithUserAndPostCounts())
            setHashLoaderActive(false);
            setLoadDatatables(true)
        }

        doEffect()
    }, [])

    if (loadDatatables && !datatablesLoaded) {
        scriptLoader.loadDatatables();
        setDatatablesLoaded(true);
    }

    const DeleteSwal = withReactContent(Swal)

    const onDeleteSwal = async (category) => {
        let result = await DeleteSwal.fire({
            position: "center",
            title: `Delete ${category.title}`,
            text: "This cannot be undone. Are you sure you want to continue ?",
            icon: "error",
            showConfirmButton: true,
            focusCancel: true
        });

        if (result.isConfirmed) {
            let success = await categoryAdminService.deleteCategoryById(category.objectId);
            if (success) {
                setCategories([]);
                setHashLoaderActive(true);
                setCategories(await categoryAdminService.retrieveCategoriesWithUserAndPostCounts())
                setHashLoaderActive(false);
            }
        }

    }

    let categoryItems = categories.map((categoryItem) =>
        <CategoryListAllAdminItem key={categoryItem.objectId}
                                  category={categoryItem}
                                  deleteSwal={onDeleteSwal}/>
    );

    return (
        <>
            <section className="content-header">
                <h1>
                    Categories
                </h1>
                <ol className="breadcrumb">
                    <li><a href="#"><i className="fa fa-dashboard"/> Home</a></li>
                    <li className="active">Categories</li>
                </ol>
            </section>
            <section className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box">

                            <div className="box-header">
                                <h3 className="box-title">Manage Categories</h3>
                            </div>
                            <div className="box-body">
                                <table id="table" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Number Of Posts</th>
                                            <th>Number of Users</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <HashLoader color={LOADER_COLOR} loading={hashLoaderActive} size={150}
                                                    css={override}/>
                                        {categoryItems}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CategoryListAllAdmin;