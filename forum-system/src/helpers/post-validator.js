class PostValidator {

    titleErrorCheck(value) {
        if (!value) {
            return "Title is required.";
        } else if (value.length < 3) {
            return "Title should be at least 3 characters long."
        } else if (value.length > 120) {
            return "Title shouldn't exceed 120 characters"
        }
        return "";
    }
}

export default PostValidator

