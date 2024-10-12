const express = require("express");
const { blogController } = require("../controllers");

const router = express.Router();

router.get("/:id", blogController.getBlog);

router.post("/new", blogController.createNewBlog);

module.exports = router;
