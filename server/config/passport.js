const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const { User } = require("../models/user.model");
require("dotenv").config();

// Mechanism to retrieve Jwt token from user request
/**
 * These config options are required
 * Option 1: jwt secret environment variable set in ".env"
 * Option 2: mechanism to fetch jwt token from request Authentication header with the "bearer" auth scheme
 */
const jwtOptions = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// Function to verify callback for passport strategy to find the user whose token is passed
/**
 * Logic to find the user matching the token passed
 * - If payload type isn't `access` return an Error() with message, "Invalid token type" in the callback function
 * - Find user object matching the decoded jwt token
 * - If there's a valid user, return the user in the callback function
 * - If user not found, return `false` in the user field in the callback function
 * - If the function err, return the error in the callback function
 *
 * @param payload - the payload the token was generated with
 * @param done - callback function
 */
const jwtVerify = async (payload, done) => {
    try {
        if (payload.type !== "access") {
            return done(
                new ApiError(httpStatus.UNAUTHORIZED, "Invalid token type"),
                false
            );
            // throw new Error("Invalid token type");
        }

        const userById = await User.findById(payload.sub);

        if (!userById)
            done(
                new ApiError(
                    httpStatus.INTERNAL_SERVER_ERROR,
                    "User not found."
                ),
                false
            );

        return done(null, userById);
    } catch (err) {
        done(err, false);
    }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
    jwtStrategy,
};
