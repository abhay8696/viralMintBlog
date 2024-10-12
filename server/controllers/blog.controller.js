const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { blogService } = require("../services");

const createNewBlog = catchAsync(async (req, res) => {
    const create = await blogService.createNewBlog({
        ...req.body,
        location: req.ip, // Set location to client's IP
        creatorId: req.user._id, // Set creator to the authenticated user
        creatorName: req.user.name, // Set creator to the authenticated user
    });

    res.status(httpStatus.CREATED).send(create);
});

const getBlog = catchAsync(async (req, res) => {
    const blog = await blogService.getBlog(req.params.id);

    res.status(httpStatus.OK).send(blog);
});

const getBlogsByLocation = catchAsync(async (req, res) => {
    const blogs = await blogService.getBlogsByLocation(req.ip);

    res.status(httpStatus.OK).send(blogs);
});

const updateBlog = catchAsync(async (req, res) => {
    const updatedBlog = await blogService.updateBlog(
        req.params.id,
        req.body,
        req.user._id
    );

    res.status(httpStatus.OK).send(updatedBlog);
});

const deleteBlog = catchAsync(async (req, res) => {
    await blogService.deleteBlog(req.params.id, req.user._id);

    res.status(httpStatus.OK).send({ message: "Blog deleted successfully!" });
});

module.exports = {
    createNewBlog,
    getBlog,
    getBlogsByLocation,
    updateBlog,
    deleteBlog,
};
