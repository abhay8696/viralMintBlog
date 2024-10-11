const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Function to generate jwt token
 * - Payload contains fields
 * --- "sub": `userId` parameter
 * --- "type": `type` parameter
 *
 * - Token expiration is set to the value of `expires` parameter
 *
 * @param {ObjectId} userId - Mongo user id
 * @param {Number} expires - Token expiration time in seconds since unix epoch
 * @param {string} type - Access token type eg: Access, Refresh
 * @param {string} [secret] - Secret key to sign the token, defaults to config.jwt.secret
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
    const paylodad = {
        sub: userId,
        type: type,
        iat: Math.floor(Date.now() / 1000),
        exp: expires,
    };

    // const options = { exp: expires };

    return jwt.sign(paylodad, secret);
};

/**
 * Function to generate auth token
 *
 * @param {user} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
    const currentTimeInSec = Math.floor(new Date() / 1000); //Date return time in milliseconds, divide by 1000 to get in seconds
    const tokenValidityInSec = 4 * 60 * 60;
    const expirationTimeFromNow = currentTimeInSec + tokenValidityInSec;

    const token = generateToken(
        user._id,
        expirationTimeFromNow * 1000,
        "access",
        process.env.JWT_SECRET
    );

    return {
        access: {
            token,
            expires: new Date(expirationTimeFromNow * 1000),
        },
    };
};

module.exports = {
    generateToken,
    generateAuthTokens,
};
