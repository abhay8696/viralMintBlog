const express = require("express");
const router = express.Router();

const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const blogRoute = require("./blog.route");

router.use("/user", userRoute);
router.use("/auth", authRoute);
router.use("/blog", blogRoute);

module.exports = router;
