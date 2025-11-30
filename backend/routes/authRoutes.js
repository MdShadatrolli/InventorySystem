const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController.js");
const loginUser = authController.loginUser;
const registerUser = authController.registerUser;



router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
