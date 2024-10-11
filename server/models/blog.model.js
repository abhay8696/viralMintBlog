const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema(
    {
        creator: {
            // Reference to the User model
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Refers to the User model
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        tags: [
            {
                type: String,
            },
        ],
        text: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
        videoUrl: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        updatedAt: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);
