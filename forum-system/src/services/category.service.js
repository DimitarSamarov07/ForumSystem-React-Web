import Backendless from 'backendless';
import {PostService} from "./post.service.js";

export class CategoryService {

    categoryStore = Backendless.Data.of("Categories");
    postService = new PostService();

    async retrieveCategories() {
        return await this.categoryStore.find();
    }

    async getCategoriesCount() {
        return await this.categoryStore.getObjectCount();
    }

    async retrieveCategoriesWithUserAndPostCounts() {
        let categories = await this.retrieveCategories();
        categories = await this.populateCategoryUserAndPostData(categories)

        return categories;
    }

    async retrieveCategoryById(categoryId) {
        return await this.categoryStore.findById({objectId: categoryId});
    }

    async populateCategoryUserAndPostData(categories) {

        for (const category of categories) {
            category.posts = await this.postService.retrievePostsFromCategory(category.objectId);
            if (category.posts.length > 0) {
                const authors = category.posts.map(x => x.author.objectId);
                const distinct = [...new Set(authors)]
                category.usersCount = distinct.length;
                category.postsCount = category.posts.length
            } else {
                category.usersCount = 0;
                category.postsCount = 0;
            }
        }

        return categories;
    }
}

