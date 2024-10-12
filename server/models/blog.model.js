const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema(
    {
        creatorId: {
            // Reference to the User model
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Refers to the User model
            required: true,
        },
        creatorName: {
            type: String,
        },
        location: {
            type: String,
            required: true,
        },
        // title: {
        //     type: String,
        //     required: true,
        //     trim: true,
        // },
        // paragraph: {
        //     type: String,
        // },
        // imageUrl: {
        //     type: String,
        // },
        editorJs: {
            type: Object,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = {
    Blog,
    BlogSchema,
};
