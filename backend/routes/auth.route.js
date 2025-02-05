const express = require("express");
const {signup, authentication} = require("../controllers/auth.controller");
const {emailVerify} = require("../middleware/emailVerification");
const router = express.Router();

router.post("/signup", signup)
router.post("/authentication", emailVerify, authentication)


module.exports.authRoutes = router