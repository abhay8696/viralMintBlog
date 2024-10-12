const { Blog } = require("../models/blog.model");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

/**
 * Fetch blog by ID and ensure the creator matches the requesting user.
 * @param {string} blogId
 * @param {string} userId
 * @returns {Promise<Blog>}
 * @throws {ApiError}
 */
const getBlogByIdAndCreator = async (blogId, userId) => {
    const blog = await Blog.findById(blogId);

    if (!blog) {
        throw new ApiError(httpStatus.NOT_FOUND, "Blog not found.");
    }

    console.log({
        creator: blog.creatorId.toString(),
        user: userId.toString(),
    });

    if (blog.creatorId.toString() !== userId.toString()) {
        throw new ApiError(httpStatus.FORBIDDEN, "Unauthorized access.");
    }

    return blog;
};

/**
 * Create a new blog
 */
const createNewBlog = async (blogData) => {
    //client send data using EditorJs blocks.
    if (blogData.editorJs.blocks.length === 0)
        throw new ApiError(httpStatus.FORBIDDEN, "Post Cannot Be Empty");

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
const updateBlog = async (blogId, blogObject, userId) => {
    await getBlogByIdAndCreator(blogId, userId); //ensure the creator matches the requesting user.

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            { $set: blogObject },
            { new: true }
        );

        if (updatedBlog) {
            return updatedBlog;
        } else {
            throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");
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
const deleteBlog = async (id, userId) => {
    await getBlogByIdAndCreator(id, userId); //ensure the creator matches the requesting user.

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
