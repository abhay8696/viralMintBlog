const passport = require("passport");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const { jwtStrategy } = require("../config/passport");

/**
 * Custom callback function implementation to verify callback from passport
 * - If authentication failed, reject the promise and send back an ApiError
 *
 * - If authentication succeeded,
 * --- set the `req.user` property as the user object corresponding to the authenticated token
 * --- resolve the promise
 */
const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
    if (err || !user) {
        return reject(
            new ApiError(httpStatus.UNAUTHORIZED, "Authentication failed.")
        );
    }
    req.user = user; // Set authenticated user in request object
    resolve();
};

/**
 * Auth middleware to authenticate using Passport "jwt" strategy with sessions disabled and a custom callback function
 *
 */
const auth = async (req, res, next) => {
    passport.use("jwt", jwtStrategy);

    return new Promise((resolve, reject) => {
        return passport.authenticate(
            "jwt",
            { session: false },
            verifyCallback(req, resolve, reject)
        )(req, res, next);
    })
        .then(() => next())
        .catch((err) => next(err));
};

module.exports = auth;
