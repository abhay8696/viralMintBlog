const express = require("express");
const router = express.Router();

const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const blogRoute = require("./blog.route");
const imageUploadByUrlRoute = require("./imageUploadByUrl.route");
const imageUploadByFileRoute = require("./imageUploadByFile.route");

router.use("/user", userRoute);
router.use("/auth", authRoute);
router.use("/blog", blogRoute);
router.use("/imageUrl", imageUploadByUrlRoute);
router.use("/imageFile", imageUploadByFileRoute);

module.exports = router;
