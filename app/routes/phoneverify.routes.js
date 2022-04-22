const router = require("express").Router();
const verifyToken = require("../auth/userauth")
const Reservation = require("../controllers/phoneverify.controller.js");

// Create a new book reservation
// router.post("/", Reservation.otpverifyCheck);

// Create a new book reservation
router.post("/sendotp", Reservation.findAllRegistration);
router.post("/verifyotp", Reservation.findAllRegistrationotp);

module.exports = router
