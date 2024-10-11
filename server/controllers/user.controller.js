const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");

const createUser = catchAsync(async (req, res) => {
    const create = await userService.createUser(req.body);

    res.status(httpStatus.CREATED).send(create);
});

const getUserByEmail = catchAsync(async (req, res) => {
    const user = await userService.getUserByEmail(req.body.email);

    res.status(httpStatus.OK).send(user);
});

module.exports = { createUser, getUserByEmail };
