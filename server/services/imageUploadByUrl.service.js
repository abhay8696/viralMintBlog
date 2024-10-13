const axios = require("axios");
const fs = require("fs");
const path = require("path");

/**
 * Fetches the image from the provided URL and saves it locally.
 * @param {string} imageUrl - The URL of the image to fetch.
 * @returns {Promise<Object>} - Object with image metadata (path, name, extension).
 */
const uploadByUrl = async (imageUrl) => {
    try {
        const response = await axios({
            url: imageUrl,
            method: "GET",
            responseType: "stream",
        });

        // Generate a unique filename with timestamp and extension
        const extension = path.extname(imageUrl).split("?")[0] || ".jpg";
        const filename = `${Date.now()}${extension}`;
        const imagePath = path.join(__dirname, "../uploads", filename);

        // Save the image to the filesystem
        await new Promise((resolve, reject) => {
            const writer = fs.createWriteStream(imagePath);
            response.data.pipe(writer);
            writer.on("finish", resolve);
            writer.on("error", reject);
        });

        return { imagePath, filename };
    } catch (error) {
        // throw new Error("Failed to fetch and save the image");
        throw new Error(error.message);
    }
};

module.exports = { uploadByUrl };
