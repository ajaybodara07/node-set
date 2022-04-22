const router = require("express").Router();
const verifyToken = require("../auth/userauth")
const Reservation = require("../controllers/racetype.controller.js");

// Create a new book reservation
router.post("/", Reservation.createRaceType);

// get all book reservation
router.get("/", Reservation.findAllRaceType);

// get a single book reservation with id
router.get("/:id", Reservation.findOneRaceType);

// update a single book reservation with id
router.put("/:id", Reservation.updateRaceType);

// Delete a book reservation with id
router.delete("/:id", Reservation.deleteRaceType);

module.exports = router
