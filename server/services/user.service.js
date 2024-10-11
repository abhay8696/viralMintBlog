const { User } = require("../models/user.model");
const httpStatus = require("http-status");

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
            return res
                .status(409)
                .json({ message: `email: ${email} already taken` });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
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

        return res.status(404).json({ message: "User not found." });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { createUser, getUserByEmail };
