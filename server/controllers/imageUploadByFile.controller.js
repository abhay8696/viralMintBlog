const { upload, imageUploadByFileService } = require("../services");

// Controller for handling image upload
const uploadImageController = (req, res) => {
    imageUploadByFileService.uploadImageByFile(req, res);
};

// Export the controller
module.exports = {
    upload,
    uploadImageController,
};
