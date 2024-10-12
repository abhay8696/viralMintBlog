const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { userService, authService, tokenService } = require("../services");

const register = catchAsync(async (req, res) => {
    const createUser = await userService.createUser(req.body);

    const token = await tokenService.generateAuthTokens(createUser);

    res.status(httpStatus.CREATED).send({ user: createUser, tokens: token });
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    // find user from authService
    const findUser = await authService.loginWithEmail(email, password);
    // generate token
    const token = await tokenService.generateAuthTokens(findUser);

    res.status(httpStatus.OK).send({
        user: findUser,
        tokens: token,
    });
});

module.exports = {
    register,
    login,
};
