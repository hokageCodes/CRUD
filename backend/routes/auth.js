// routes/auth.js

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");

// @route    POST api/auth/signup
// @desc     Register a user
// @access   Public
router.post(
  "/signup",
  [
    check("name", "Please enter a name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  authController.signup
);

// @route    POST api/auth/login
// @desc     Login a user
// @access   Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  authController.login
);

module.exports = router;
