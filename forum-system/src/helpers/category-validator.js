class CategoryValidator {

    titleErrorCheck(value) {
        if (!value) {
            return "Title is required.";
        } else if (value.length < 6) {
            return "Title should be at least 6 character long.";
        } else if (value.length > 40) {
            return "Title should be no more than 40 characters long.";
        } else {
            return "";
        }
    }

    descriptionErrorCheck(value) {
        if (!value) {
            return "Description is required."
        } else if (value.length < 20) {
            return "Description should be at least 20 character long.";
        } else if (value.length > 300) {
            return "Description should be no more than 300 characters long.";
        } else {
            return "";
        }
    }
}

export {CategoryValidator}