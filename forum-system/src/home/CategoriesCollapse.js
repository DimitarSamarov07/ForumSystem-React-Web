import React, {useEffect, useState} from "react";
import {CategoryService} from "../services/category.service.js";
import CollapseCategoryItem from "./CollapseCategoryItem.js";

const categoryService = new CategoryService();

const CategoriesCollapse = () => {
    let [categories, setCategories] = useState([]);

    useEffect(async () => {
        setCategories(await categoryService.retrieveCategories());
    }, [])

    const listItems = categories.map((categoryItem) =>
        <CollapseCategoryItem category={categoryItem}/>
    );

    return (
        <table className="table table-bordered table-hover text-left">
            {listItems}
        </table>
    )

}

export default CategoriesCollapse;