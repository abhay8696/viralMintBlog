const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { blogService } = require("../services");

const createNewBlog = catchAsync(async (req, res) => {
    const create = await blogService.createNewBlog({
        ...req.body,
        location: req.ip,
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
    const updatedBlog = await blogService.updateBlog(req.params.id, req.body);

    res.status(httpStatus.OK).send(updatedBlog);
});

module.exports = { createNewBlog, getBlog, getBlogsByLocation, updateBlog };
