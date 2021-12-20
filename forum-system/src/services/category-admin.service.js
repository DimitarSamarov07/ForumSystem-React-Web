import {CategoryService} from "./category.service.js";
import {CloudinaryService} from "./cloudinary.service.js";

export class CategoryAdminService extends CategoryService {
    cloudinaryService = new CloudinaryService();

    async createNewCategory(title, description, image) {
        const imageUrl = await this.cloudinaryService.uploadImage(image);
        try {
            await this.categoryStore.save({title, description, imageUrl});
        } catch (e) {

        }
    }

    async deleteCategoryById(objectId) {
        try {
            await this.categoryStore.remove({objectId});
            return true;
        } catch (e) {
            return false;
        }
    }

    async editCategoryById(id, data, imgFile) {
        if (imgFile) {
            data.imageUrl = await this.cloudinaryService.uploadImage(imgFile);
        }
        const category = await this.categoryStore.findById(id);
        Object.assign(category, data); //overwrite data

        await this.categoryStore.save(category);
    }
}
