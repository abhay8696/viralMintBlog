const { Blog } = require("../models/blog.model");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

/**
 * Create a new blog
 */
const createNewBlog = async (blogData) => {
    try {
        const create = await Blog.create(blogData);

        return create;
    } catch (error) {
        let code = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        throw new ApiError(code, error);
    }
};

/**
 * Fetches blog for a user
 * - If shop doesn't exist, throw ApiError
 * --- status code  - 404 NOT FOUND
 * --- message - "Shop does not exist"
 * - Else return Blog/All Blogs
 *
 * @param {Blog id}
 * @returns {Promise<Shop>}
 * @throws {ApiError}
 */
const getBlog = async (id) => {
    try {
        let blog;
        if (id === "all") blog = await Blog.find();
        else blog = await Blog.findById(id);

        if (!blog) throw new ApiError(httpStatus.NOT_FOUND, "Blog Not Found.");

        return blog;
    } catch (error) {
        let code = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        throw new ApiError(code, error);
    }
};

module.exports = { createNewBlog, getBlog };
