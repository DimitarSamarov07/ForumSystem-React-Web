import Backendless from 'backendless';

export class CategoryService {

    categoryStore = Backendless.Data.of("Categories");

    async retrieveCategories() {
        return await this.categoryStore.find();
    }

    async getCategoriesCount() {
        return await this.categoryStore.getObjectCount();
    }

    async retrieveCategoryById(categoryId) {
        return await this.categoryStore.findById({objectId: categoryId});
    }
}

