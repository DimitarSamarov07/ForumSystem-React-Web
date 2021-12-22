import {css} from "@emotion/react";
import React, {useEffect, useState} from "react";
import {HashLoader} from "react-spinners";
import {CategoryService} from "../services/category.service.js";
import CollapseCategoryItem from "./CollapseCategoryItem.js";

const categoryService = new CategoryService();

const LOADER_COLOR = "#e95420";

const CategoriesCollapse = () => {
    let [categories, setCategories] = useState(null);

    useEffect(async () => {
        setCategories(await categoryService.retrieveCategoriesWithUserAndPostCounts());
    }, [])

    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;

    const listItems = categories?.map((categoryItem) =>
        <CollapseCategoryItem category={categoryItem}/>
    );

    if (!categories) {
        return <HashLoader color={LOADER_COLOR} css={override} size={150}/>
    }

    return (
        <table className="table table-bordered table-hover text-left">
            {listItems}
        </table>
    )

}

export default CategoriesCollapse;