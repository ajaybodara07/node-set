const router = require("express").Router();
const Reservation = require("../controllers/spotreservation.controller.js");

// create on spot book reservation
router.post("/", Reservation.bookReservationSpot);

module.exports = router
