const express = require("express");
const router =  express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");
// for signup page render and signup functionality
router.route("/signup")
.get( userController.renderSignupForm) //Get request
.post( wrapAsync(userController.signup)); // Post request

// for login page render and login functionality using get and post request
router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local", {failureRedirect: "/login", failureFlash: true }), userController.login);

// For logout functionality
router.get("/logout", userController.logout);

module.exports = router;