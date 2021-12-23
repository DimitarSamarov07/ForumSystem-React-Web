import {css} from "@emotion/react";
import * as moment from 'moment';
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {HashLoader} from "react-spinners";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ScriptLoader from "../../helpers/script-loader.js";
import {CategoryService} from "../../services/category.service.js";
import {PostService} from "../../services/post.service.js";
import ListCategoryPostsAdminItem from "./ListCategoryPostsAdminItem.js";
import "./styles/ListCategoryPostsAdmin.css"

const postService = new PostService();
const categoryService = new CategoryService();
const scriptLoader = new ScriptLoader();
const LOADER_COLOR = "#367fa9";

const ListCategoryPostsAdmin = () => {
    let {categoryId} = useParams();
    let [posts, setPosts] = useState([]);
    let [category, setCategory] = useState();
    let [hashLoaderLoading, setHashLoaderLoading] = useState(true);
    let [loadDatatables, setLoadDatatables] = useState(false);
    let [datatablesLoaded, setDatatablesLoaded] = useState(false);
    let navigate = useNavigate();

    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;

    useEffect(() => {
        async function doEffect() {
            let retrievedCategory = await categoryService.retrieveCategoryById(categoryId);

            if (retrievedCategory) {
                setCategory(retrievedCategory);
                let posts = await postService.retrievePostsFromCategory(categoryId)
                posts.forEach(x => x.parsedCreated = moment(x.created).format("DD/MM/YYYY hh:mm:ss"))

                setPosts(posts);
                setLoadDatatables(true);
            }
            setHashLoaderLoading(false);
        }

        doEffect()
    }, [])

    if (loadDatatables && !datatablesLoaded) {
        scriptLoader.loadDatatables();
        setDatatablesLoaded(true);
    }

    const DeleteSwal = withReactContent(Swal);
    const onDeleteSwal = async (post) => {
        let result = await DeleteSwal.fire({
            position: "center",
            title: `Delete ${post.title}`,
            text: "This cannot be undone. Are you sure you want to continue ?",
            icon: "error",
            showConfirmButton: true,
            focusCancel: true
        });

        if (result.isConfirmed) {
            let success = await postService.deletePost(post.objectId)
            if (success) {
                setPosts([]);
                setHashLoaderLoading(true);
                let retrievedPosts = await postService.retrievePostsFromCategory(categoryId);
                retrievedPosts.forEach(x => x.parsedCreated = moment(x.created).format("DD/MM/YYYY hh:mm:ss"));
                setPosts(retrievedPosts);
                setHashLoaderLoading(false);
            }
        }

    }

    let postItems = posts.map((post) =>
        <ListCategoryPostsAdminItem key={post.objectId}
                                    post={post}
                                    deleteSwal={onDeleteSwal}/>
    )

    if (!hashLoaderLoading && !category) {
        navigate("/administration/category/list");
    }

    return (
        <>
            <section className="content-header">
                <h1>
                    Posts from <b>{category?.title}</b>
                </h1>
                <ol className="breadcrumb">
                    <li><a href="#"><i className="fa fa-dashboard"/> Home</a></li>
                    <li className="active">Posts</li>
                </ol>
            </section>

            <section className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box">

                            <div className="box-header">
                                <h3 className="box-title">Manage Posts</h3>
                            </div>
                            <div className="box-body">
                                <table id="table" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Title</th>
                                            <th>Author</th>
                                            <th>CreatedOn</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <HashLoader color={LOADER_COLOR} loading={hashLoaderLoading} size={150}
                                                    css={override}/>
                                        {postItems}
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

export default ListCategoryPostsAdmin;