const express = require("express");
const auth = require("../middlewares/auth");
const { blogController } = require("../controllers");

const router = express.Router();

router.get("/location", blogController.getBlogsByLocation);

router.get("/:id", blogController.getBlog);

router.post("/new", auth, blogController.createNewBlog);

router.put("/:id", auth, blogController.updateBlog);

router.delete("/:id", auth, blogController.deleteBlog);

module.exports = router;
