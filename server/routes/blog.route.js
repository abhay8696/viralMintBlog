const express = require("express");
const { blogController } = require("../controllers");

const router = express.Router();

router.get("/location", blogController.getBlogsByLocation);

router.get("/:id", blogController.getBlog);

router.post("/new", blogController.createNewBlog);

router.put("/:id", blogController.updateBlog);

router.delete("/:id", blogController.deleteBlog);

module.exports = router;
