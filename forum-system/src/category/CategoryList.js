import {css} from "@emotion/react";
import React, {useEffect, useState} from "react";
import {HashLoader} from "react-spinners";
import {CategoryService} from "../services/category.service.js";
import CategoryListItem from "./CategoryListItem.js";

const categoryService = new CategoryService();

const LOADER_COLOR = "#e95420";

const CategoryList = () => {
    let [categories, setCategories] = useState(null);
    let categoryItems;

    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;

    useEffect(async () => {
        setCategories(await categoryService.retrieveCategoriesWithUserAndPostCounts());
    }, [])

    categoryItems = categories?.map(category =>
        <CategoryListItem key={category.objectId} category={category}/>
    );

    if (!categories) {
        return <HashLoader size={150} color={LOADER_COLOR} css={override}/>;
    }


    return (
        <>
            <h1>List of categories</h1>
            <table className="table table-bordered table-hover">
                <tbody>
                    {categoryItems}
                </tbody>
            </table>
        </>
    )
}

export default CategoryList;