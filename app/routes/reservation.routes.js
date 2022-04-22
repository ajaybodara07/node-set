const router = require("express").Router();
const { body, validationResult } = require('express-validator');
const Reservation = require("../controllers/reservation.controller.js");
const verifyToken = require("../auth/userauth")
// Create a new book reservation
router.post("/", [
  body('FullName', 'Fullname must be use only character').isAlpha(),
  body('Email').isEmail().normalizeEmail(),
  body('Quantity').isLength({ min: 1 }),
  body('MobileNumber', 'MobileNumber length should be 10 characters').isLength({ min: 10 }),
], Reservation.bookReservation);


// create on spot book reservation
router.post("/spot", Reservation.bookReservationSpot);

// get all book reservation
router.get("/", Reservation.findAllReservation);

// get a single book reservation with id
router.get("/:id", Reservation.findOneReservation);

// update a single book reservation with id
router.put("/:id", Reservation.updateReservation);

// Delete a book reservation with id
router.delete("/:id", Reservation.deleteReservation);

module.exports = router
