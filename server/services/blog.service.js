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
 * - If blog doesn't exist, throw ApiError
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

/**
 * Fetches blog based on user's location/ip
 * - If blogs doesn't exist, throw ApiError
 * - Else return Blogs
 *
 * @param {Blog id}
 * @returns {Promise<Shop>}
 * @throws {ApiError}
 */
const getBlogsByLocation = async (location) => {
    try {
        let blogs = await Blog.find({ location: location });

        if (!blogs)
            throw new ApiError(httpStatus.NOT_FOUND, "Blogs Not Found.");

        return blogs;
    } catch (error) {
        let code = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        throw new ApiError(code, error);
    }
};

/**
 * Updates the blog with new blog object
 * - If blog doesn't exist, throw ApiError
 * - Else return updated blog
 *
 * @param {BLog} updatedBlog
 * @param {string} id
 * @returns {Promise<Shop>}
 * @throws {ApiError}
 */
const updateBlog = async (blogId, blogObject) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            { $set: blogObject },
            { new: true }
        );

        if (updatedBlog) {
            return updatedBlog;
        } else {
            throw new ApiError(httpStatus.NOT_FOUND, "BLog not found");
        }
    } catch (error) {
        let code = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        throw new ApiError(code, error);
    }
};

/**
 * Delete Blog
 *
 * @param {string} id
 * @returns {null}
 * @throws {ApiError}
 */
const deleteBlog = async (id) => {
    try {
        const result = await Blog.deleteOne({ _id: id });
        console.log({ result });
        if (result.deletedCount === 1) return true;
        else throw new ApiError(httpStatus.NOT_FOUND, `Blog not found`);
    } catch (error) {
        let code = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        throw new ApiError(code, error);
    }
};

module.exports = {
    createNewBlog,
    getBlog,
    getBlogsByLocation,
    updateBlog,
    deleteBlog,
};
