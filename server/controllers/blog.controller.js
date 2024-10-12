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

module.exports = { createNewBlog, getBlog };
