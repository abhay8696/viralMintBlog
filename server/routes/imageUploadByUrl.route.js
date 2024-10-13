const express = require("express");
const router = express.Router();
const { imageUploadByUrlController } = require("../controllers");

// Route to upload image by URL
router.post(
    "/uploadImageByUrl",
    imageUploadByUrlController.uploadImageByUrlHandler
);

module.exports = router;
