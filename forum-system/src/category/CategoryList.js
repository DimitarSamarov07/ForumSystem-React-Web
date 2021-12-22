import React, {useEffect, useState} from "react";
import {CategoryService} from "../services/category.service.js";
import CategoryListItem from "./CategoryListItem.js";

const categoryService = new CategoryService();

const CategoryList = () => {
    let [categories, setCategories] = useState([]);
    let categoryItems;

    useEffect(async () => {
        setCategories(await categoryService.retrieveCategoriesWithUserAndPostCounts());
    }, [])

    categoryItems = categories.map(category =>
        <CategoryListItem key={category.objectId} category={category}/>
    );


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