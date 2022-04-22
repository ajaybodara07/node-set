const router = require("express").Router();
const { body, validationResult } = require('express-validator');
const User = require("../controllers/user.controller.js");
const verifyToken = require("../auth/userauth")

// Create a new User
router.post("/signup", [
  body('Email').isEmail().normalizeEmail(),
  body('Password', 'Password length should be 6 characters').isLength({
    min: 15
  }),
  body('Username', 'Username length should be 6 characters').isLength({
    min: 15
  }),
], User.createUser);

// check login a User
router.post("/login", User.loginUser);

// Retrieve all User
router.get("/", verifyToken, User.findAllUser);

// Retrieve a single User with id
router.get("/:id", verifyToken, User.findOneUser);

// Add a single User Start Time with id
router.put("/:id", verifyToken, User.updatedateUser);

// Delete a User with id
router.delete("/:id", verifyToken, User.deleteUser);

module.exports = router
