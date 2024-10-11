const express = require("express");
const { userController } = require("../controllers");

const router = express.Router();

// router.post("/new", userController.createUser);

router.get("/email", userController.getUserByEmail);

module.exports = router;
