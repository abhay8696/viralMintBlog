const express = require("express");
const auth = require("../middlewares/auth");
const { blogController } = require("../controllers");

const router = express.Router();

router.get("/location", auth, blogController.getBlogsByLocation);

router.get("/:id", auth, blogController.getBlog);

router.post("/new", auth, blogController.createNewBlog);

router.put("/:id", auth, blogController.updateBlog);

router.delete("/:id", auth, blogController.deleteBlog);

module.exports = router;
