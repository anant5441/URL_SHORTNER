const express = require("express");
const { handleUserSignUp, handleUserLogin } = require("../controllers/user");

const router = express.Router();

router.post("/", handleUserSignUp);       // signup
router.post("/login", handleUserLogin);   // ✅ login route

module.exports = router;
