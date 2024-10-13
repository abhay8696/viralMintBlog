const express = require("express");
const router = express.Router();
const { uploadImageController } = require("../controllers");
const { imageUploadByFileService } = require("../services");
const { imageUploadByFileController } = require("../controllers");

// Route for uploading image
router.post(
    "/uploadImageByFile",
    imageUploadByFileService.upload.single("file"),
    imageUploadByFileController.uploadImageController
);

module.exports = router;
