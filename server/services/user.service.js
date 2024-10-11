const { User } = require("../models/user.model");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { generateAuthTokens } = require("./token.service");

/**
 * Create a new user
 *  - check if the user with the email already exists using `User.isEmailTaken()` method
 *  - If so throw an error with message, "email already taken”
 *  - Otherwise, create and return a new user object
 */
const createUser = async (newUser) => {
    const { email } = newUser;

    try {
        // check if email is unique
        const isEmailTaken = await User.isEmailTaken(email);

        if (isEmailTaken) {
            throw new ApiError(httpStatus.CONFLICT, "Email Already Exists.");
        }

        const create = await User.create(newUser);

        return create;
    } catch (error) {
        let code = error.statusCode;
        if (!code) code = httpStatus.INTERNAL_SERVER_ERROR;
        throw new ApiError(code, error);
    }
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<Admin>}
 */
const getUserByEmail = async (email) => {
    try {
        let getUser = await User.findOne({ email: email });
        if (getUser) return getUser;

        throw new ApiError(httpStatus.NOT_FOUND, "User Not Found.");
    } catch (error) {
        let code = error.statusCode;
        if (!code) code = httpStatus.INTERNAL_SERVER_ERROR;
        throw new ApiError(code, error);
    }
};

module.exports = { createUser, getUserByEmail };
