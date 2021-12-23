import {css} from "@emotion/react";
import React, {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {NavLink, useParams} from "react-router-dom";
import {HashLoader} from "react-spinners";
import {PostService} from "../services/post.service.js";
import {UserService} from "../services/user.service.js";
import CategoryDetailsItem from "./CategoryDetailsItem.js";
import "./styles/CategoryDetails.css"

const postService = new PostService();
const userService = new UserService();
const POSTS_PER_PAGE = 10;
const LOADER_COLOR = "#e95420";

const CategoryDetails = () => {
    const {id} = useParams();
    let [currUser, setCurrUser] = useState(null);
    let [category, setCategory] = useState(null);
    let [totalDataLength, setTotalDataLength] = useState(0);

    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;

    useEffect(() => {
        async function doEffect() {
            setCurrUser(await userService.getCurrUser());
            setCategory(await postService.paginatePostsFromCategory(id, 0, POSTS_PER_PAGE));
            setTotalDataLength(await postService.getCountOfCategoryPosts(id));
        }

        doEffect();
    }, [])

    const handlePageChange = async (data) => {
        if (data) {
            let shadowCategoryCopy = Object.assign({}, category);
            shadowCategoryCopy.posts = null;
            setCategory(shadowCategoryCopy);
            setCategory(await postService.paginatePostsFromCategory(id, data.selected, POSTS_PER_PAGE))
        }
    }

    let posts = category?.posts?.map(post =>
        <CategoryDetailsItem category={category} post={post} key={post.objectId}/>
    );

    if (!category) {
        return (
            <HashLoader color={LOADER_COLOR} loading={true} size={150} css={override}/>
        )
    }
    return (
        <>
            <h1>Welcome to the <b>{category.title}</b> category</h1>
            <div className="align-content-stretch"><img id="borderimage" src={category.imageUrl} width="553"
                                                        height="310" alt="category-image"/>
            </div>
            <br/>

            {!currUser ?
                <p className="text-muted">
                    You must be a registered user to add new
                    posts. <NavLink className="text-dark" to="/user/login">Login</NavLink> or
                    <NavLink className="text-dark" to="/user/register"> Register</NavLink> now.

                </p>
                :
                <div className="row">
                    <h3>
                        <NavLink className="btn btn-primary" to={`/post/create/${category.objectId}`}>New Post</NavLink>
                    </h3>
                </div>
            }

            <br/>

            {
                category.posts?.length === 0 ?

                    <div className="text-center ">
                        <h2>There are no posts in this forum</h2>
                    </div>
                    :
                    <table className="table table-bordered table-hover">
                        <tbody>
                            {
                                posts ? posts :
                                    <HashLoader color={LOADER_COLOR} loading={true} size={150} css={override}/>

                            }
                        </tbody>

                    </table>
            }

            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageChange}
                pageRangeDisplayed={10}
                pageCount={Math.ceil(totalDataLength / POSTS_PER_PAGE)}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination justify-content-center"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                activeClassName="active"
            />
        </>
    )
}

export default CategoryDetails;