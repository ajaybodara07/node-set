const router = require("express").Router();
const verifyToken = require("../auth/userauth")
const Registration = require("../controllers/registration.controller.js");

// Create a new book registration
router.post("/", Registration.spotRegistration);

// get all book registration
router.get("/", Registration.findAllRegistration);

// get a single book registration with id
router.get("/:id", Registration.findOneRegistration);

// update a single book registration with id
router.put("/:id", Registration.updateRegistration);

// Delete a book registration with id
router.delete("/:id", Registration.deleteRegistration);

module.exports = router
