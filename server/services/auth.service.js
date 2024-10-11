const httpStatus = require("http-status");
const userService = require("./user.service");
const { User } = require("../models/user.model");

/**
 * Login with email and password
 * - Use userService method to fetch user object corresponding to the email provided
 * - Use the User schema's "isPasswordMatch" method to check if input password matches the one user registered with (i.e, hash stored in MongoDB)
 * - If user doesn't exist or incorrect password,
 * throw an ApiError with "401 Unauthorized" status code and message, "Incorrect email or password"
 * - Else, return the admin object
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */

const loginWithEmail = async (email, password) => {
    // return {email, password}

    const getUser = await userService.getUserByEmail(email);

    if (!getUser) {
        throw new ApiError(
            httpStatus.UNAUTHORIZED,
            "Incorrect contact or password"
        );
    }

    const passwordMatch = await getUser.isPasswordMatch(password); //function in admin.model.js

    if (!getUser || !passwordMatch) {
        throw new ApiError(
            httpStatus.UNAUTHORIZED,
            "Incorrect contact or password"
        );
    }

    return getUser;
};

module.exports = { loginWithEmail };
