const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads"); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Create a unique filename
    },
});

// Initialize multer with the defined storage
const upload = multer({ storage });

// Service to handle file upload
const uploadImageByFile = (req, res) => {
    // Check if a file was uploaded
    if (!req.file) {
        return res
            .status(400)
            .json({ success: 0, message: "No file uploaded" });
    }
    fs.readdir("./uploads", (err, files) => {
        if (err) throw err;
        console.log(files); // This will show you the files in the uploads directory
    });

    // Determine the URL based on the NODE_ENV
    const isProduction = process.env.NODE_ENV === "production";
    const baseUrl = isProduction
        ? process.env.VERCEL_URL
        : process.env.LOCAL_URL;

    // Respond with the file information
    res.status(200).json({
        success: 1,
        file: {
            url: `${baseUrl}/uploads/${req.file.filename}`,
            name: req.file.filename,
            path: path.join(__dirname, "../uploads", req.file.filename),
        },
    });
};

// Export the upload middleware and service
module.exports = {
    upload,
    uploadImageByFile,
};
