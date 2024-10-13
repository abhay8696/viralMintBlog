const { imageUploadByUrlService } = require("../services");
require("dotenv").config();

/**
 * Controller to handle image upload requests.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const uploadImageByUrlHandler = async (req, res) => {
    try {
        const { imageUrl } = req.body;

        if (!imageUrl) {
            return res.status(400).json({ message: "Image URL is required" });
        }

        const { imagePath, filename } =
            await imageUploadByUrlService.uploadByUrl(imageUrl);

        // Determine the URL based on the NODE_ENV
        const isProduction = process.env.NODE_ENV === "production";
        const baseUrl = isProduction
            ? process.env.VERCEL_URL
            : process.env.LOCAL_URL;

        // Respond with success and file metadata
        res.status(200).json({
            success: 1,
            file: {
                url: `${baseUrl}/uploads/${filename}`,
                name: filename,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: 0,
            message: "Image upload failed",
            error: error.message,
        });
    }
};

module.exports = { uploadImageByUrlHandler };
