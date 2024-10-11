const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        validate: {
            validator: (email) => validator.isEmail(email),
            message: (props) => `${props.value} is not a valid email.`,
        },
        lowercase: true,
    },
    password: {
        type: String,
        validate(value) {
            if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                throw new Error(
                    "Password must contain at least one letter and one number"
                );
            }
        },
        required: true,
        minLength: 8,
        trim: true,
        // validate: [passwordValidator, 'Password must be at least 8 characters long and contain at least one letter and one number.']
    },
});

/**
 * Pre-save hook to hash the password before saving to the database
 */
UserSchema.pre("save", async function (next) {
    const user = this;

    if (this.isModified("password")) {
        // Only hash the password if it has been modified (or is new)
        try {
            // Generate a salt
            const salt = await bcrypt.genSalt(10);

            // Hash the password with the salt
            const hashedPassword = await bcrypt.hash(user.password, salt);

            // Replace the plain password with the hashed password
            user.password = hashedPassword;

            next();
        } catch (error) {
            return next(error);
        }
    }
});

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
 */
UserSchema.statics.isEmailTaken = async function (email) {
    let result = await this.findOne({ email: email });
    return !!result;
};

/**
 * Check if entered password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
UserSchema.methods.isPasswordMatch = async function (password) {
    // const user = this;

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (err, isMatch) => {
            if (err) {
                reject(err);
            }
            resolve(isMatch);
        });
    });
};

const User = mongoose.model("User", UserSchema);

module.exports = {
    User,
    UserSchema,
};
