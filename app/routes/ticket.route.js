const router = require("express").Router();
const verifyToken = require("../auth/userauth")
const Reservation = require("../controllers/ticket.controller.js");

// Create a new book reservation
router.post("/", Reservation.createTicketType);

// get all book reservation
router.get("/", Reservation.findAllTicketType);

// get a single book reservation with id
router.get("/:id", Reservation.findOneTicketType);

// update a single book reservation with id
router.put("/:id", Reservation.updateTicketType);

// Delete a book reservation with id
router.delete("/:id", Reservation.deleteTicketType);

module.exports = router
